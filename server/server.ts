import { app, PORT } from './config/init.config';

import { routes } from './routes/master.route';

routes(app);

app.listen(PORT, () => console.log(`Server is active. Now listening on port ${PORT}.`));