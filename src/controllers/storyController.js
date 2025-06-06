export const info = (req, res) => res.send(`<h1>Story Info: ${req.params.id}</h1>`);
export const edit = (req, res) => res.send(`<h1>Story Edit: ${req.params.id}</h1>`);
export const remove = (req, res) => res.send(`<h1>Story Remove: ${req.params.id}</h1>`);
export const trending = (req, res) => res.send('<h1>Trending Story</h1>');
export const newStory = (req, res) => res.send('<h1>New Story</h1>');