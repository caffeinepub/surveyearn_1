import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Map "mo:core/Map";
import AccessControl "./authorization/access-control";
import Prim "mo:prim";
import Runtime "mo:core/Runtime";

actor {
  let accessControlState = AccessControl.initState();

  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) {
        Runtime.trap("CAFFEINE_ADMIN_TOKEN environment variable is not set");
      };
      case (?adminToken) {
        AccessControl.initialize(accessControlState, caller, adminToken, userSecret);
      };
    };
  };

  type User = {
    userId : Text;
    username : Text;
    passwordHash : Text;
    balance : Nat;
  };

  type SessionInfo = {
    userId : Text;
    username : Text;
  };

  let users = Map.empty<Text, User>();
  let sessions = Map.empty<Text, SessionInfo>();
  let processedTransactions = Map.empty<Text, Bool>();
  var userCounter : Nat = 0;

  func simpleHash(s : Text) : Text {
    var h : Nat = 5381;
    for (c in Text.toIter(s)) {
      let code = Nat32.toNat(Char.toNat32(c));
      h := (h * 33 + code) % 1_000_000_007;
    };
    Nat.toText(h)
  };

  func generateToken(username : Text, userId : Text) : Text {
    let t = Int.toText(Time.now());
    simpleHash(username # userId # t)
  };

  public func register(username : Text, password : Text) : async { #ok : Text; #err : Text } {
    if (username == "" or password == "") {
      return #err("Username and password required");
    };
    switch (users.get(username)) {
      case (?_) { return #err("Username already taken") };
      case null {
        userCounter += 1;
        let userId = Nat.toText(userCounter);
        let user : User = {
          userId = userId;
          username = username;
          passwordHash = simpleHash(password);
          balance = 0;
        };
        users.add(username, user);
        let token = generateToken(username, userId);
        sessions.add(token, { userId = userId; username = username });
        #ok(token)
      };
    }
  };

  public func login(username : Text, password : Text) : async { #ok : Text; #err : Text } {
    switch (users.get(username)) {
      case null { #err("Invalid credentials") };
      case (?user) {
        if (user.passwordHash == simpleHash(password)) {
          let token = generateToken(username, user.userId);
          sessions.add(token, { userId = user.userId; username = username });
          #ok(token)
        } else {
          #err("Invalid credentials")
        }
      };
    }
  };

  public query func getProfile(token : Text) : async { #ok : { userId : Text; username : Text; balance : Nat }; #err : Text } {
    switch (sessions.get(token)) {
      case null { #err("Invalid session") };
      case (?info) {
        switch (users.get(info.username)) {
          case null { #err("User not found") };
          case (?user) {
            #ok({ userId = user.userId; username = user.username; balance = user.balance })
          };
        }
      };
    }
  };

  public func processPostback(userId : Text, reward : Nat, status : Text, transactionId : Text) : async Text {
    if (status != "completed") { return "OK" };
    switch (processedTransactions.get(transactionId)) {
      case (?_) { return "OK" };
      case null {
        for ((_, user) in users.entries()) {
          if (user.userId == userId) {
            users.add(
              user.username,
              {
                userId = user.userId;
                username = user.username;
                passwordHash = user.passwordHash;
                balance = user.balance + reward;
              },
            );
          };
        };
        processedTransactions.add(transactionId, true);
        "OK"
      };
    }
  };

  public func logout(token : Text) : async Bool {
    sessions.remove(token);
    true
  };
}
