export const home = (req, res) => res.render('home', { pageTitle: 'Home'});
export const info = (req, res) => res.render('story_info', { pageTitle: 'Story Info', storyId: req.params.id });
export const edit = (req, res) => res.render('story_edit', { pageTitle: 'Story Edit', storyId: req.params.id });
export const remove = (req, res) => res.render('story_remove', { pageTitle: 'Story Remove', storyId: req.params.id });
export const trending = (req, res) => res.render('story_trending', { pageTitle: 'Trending Stories' });
export const newStory = (req, res) => res.render('story_new', { pageTitle: 'New Story' });