import express from 'express'
import controllerEvent from './controllers/events.controller.js'
import controllerUsers from './controllers/users.controller.js'
import auth from './middleware.js'


const app = express();

const PORT = 3000

app.use(express.json());

app.post('/user/register', controllerUsers.register);
app.post('/users/tickets/buy',auth, controllerUsers.buy);
app.get('/users/:username/summary',auth, controllerUsers.getSummary);

app.post('/creator/events', auth, controllerEvent.creatEvent);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


