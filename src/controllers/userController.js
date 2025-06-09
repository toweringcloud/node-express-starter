export const list = (req, res) => res.render('user_list', { pageTitle: 'User List' });
export const info = (req, res) => res.render('user_info', { pageTitle: 'User Info', userId: req.params.id });
export const edit = (req, res) => res.render('user_edit', { pageTitle: 'User Edit' });
export const signUp = (req, res) => res.render('user_signup', { pageTitle: 'Join' });
export const signIn = (req, res) => res.render('user_signin', { pageTitle: 'Login' });
export const signOut = (req, res) => res.render('user_signout', { pageTitle: 'Logout' });