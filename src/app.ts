import express from 'express';
import cors from 'cors';
import Config from './env';
import routeError from './middlewarres/routeError';
import sendingError from './middlewarres/sendingError';
import user from './routes/user';
import auth from './routes/auth';
import project from './routes/project';
import userProject from './routes/userProject';
import sprint from './routes/sprint';
import task from './routes/task';
import returned from './routes/return';
import wastedHour from './routes/wastedHour';
import comment from './routes/comment';
import timeTask from './routes/timeTask';
import pushTime from './routes/pushTime';
import event from './routes/event';
import positionUser from './routes/positionUser';
import image from './routes/image';
import file from './routes/file';
import uploads from './middlewarres/files/upload';

/**
 * API server
 */
export default class ProjectAPI {
  /**
   * Port to listen for requests
   */
  private port = Config.port;

  /**
   * Host to listen for requests
   */
  private host = Config.host;

  /**
   * Express application
   */
  private app = express();


  /**
   * Creates an instance of ProjectAPI.
   * Requires PORT and HOST env vars to be set.
   */
  constructor() {
    this.app.use(express.json());

    this.app.use(cors({
      maxAge: 600,
    }));

    this.app.use(uploads.single('file'));

    this.app.use('/user', user);

    this.app.use('/auth', auth);

    this.app.use('/project', project);

    this.app.use('/userProject', userProject);

    this.app.use('/sprint', sprint);

    this.app.use('/task', task);

    this.app.use('/return', returned);

    this.app.use('/wastedHour', wastedHour);

    this.app.use('/comment', comment);

    this.app.use('/timeTask', timeTask);

    this.app.use('/pushTime', pushTime);

    this.app.use('/event', event);

    this.app.use('/positionUser', positionUser);

    this.app.use('/image', image);

    this.app.use('/file', file);

    this.app.use(routeError);

    this.app.use(sendingError);
  }

  /**
   * Start API server
   */
  public start(): void {
    this.app.listen(this.port, async () => {
      console.log(`⚡️[server]: Server is running at http://${this.host}:${this.port}`);
    });
  }
}
