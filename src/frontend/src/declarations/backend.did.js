// @ts-nocheck
export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok': IDL.Text, 'err': IDL.Text });
  const ProfileResult = IDL.Variant({
    'ok': IDL.Record({ userId: IDL.Text, username: IDL.Text, balance: IDL.Nat }),
    'err': IDL.Text
  });
  return IDL.Service({
    '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
    'register': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'login': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'getProfile': IDL.Func([IDL.Text], [ProfileResult], ['query']),
    'processPostback': IDL.Func([IDL.Text, IDL.Nat, IDL.Text, IDL.Text], [IDL.Text], []),
    'logout': IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
