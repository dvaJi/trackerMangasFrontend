import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

export interface Credentials {
  username: string;
  token: string;
}

export interface RegisterContext {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface ActivateContext {
  id: number;
  code: string;
}

export interface ForgotContext {
  email: string;
}

export interface ResetPasswordContext {
  code: string;
  password: string;
}

const credentialsKey = 'credentials';

const routes = {
  login: () => `/auth/login`,
  register: () => `/auth/register`,
  activate: (a: ActivateContext) => `/auth/activate/${a.id}/${a.code}`,
  forgot: () => `/auth/forgot`,
  reset_password: () => `/auth/reset_password`
};

@Injectable()
export class AuthenticationService {

  private _credentials: Credentials;

  constructor(private http: Http) {
    this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.http.post(routes.login(), JSON.stringify(context))
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        this.setCredentials(data, context.remember);
        return Observable.of(data);
      });
  }

  /**
   * Registro de usuarios.
   * @param {RegisterContext} context Parámetros para el registro.
   * @return {Observable<any>} Retorna el estado del registro.
   */
  register(context: RegisterContext): Observable<any> {
    return this.http.post(routes.register(), JSON.stringify(context))
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  /**
   * Activa la cuenta del usuario.
   * @param {ActivateContext} context Parámetros para la activación.
   * @return {Observable<any>} Retorna el estado de la activación.
   */
  activate(context: ActivateContext): Observable<any> {
    return this.http.post(routes.activate(context), JSON.stringify(context))
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  /**
   * Desactiva la cuenta y envía un código para reestablecer la
   * contraseña del correo asociado.
   * @param {ForgotContext} context Parámetros para reestablecer la contraseña.
   * @return {Observable<any>} Retorna un mensaje con las instrucciones.
   */
  forgot(context: ForgotContext): Observable<any> {
    return this.http.post(routes.forgot(), JSON.stringify(context))
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  /**
   * Activa y reestablece la contraseña con el código
   * @param {ResetPasswordContext} context Parámetros para nueva contraseña.
   * @return {Observable<any>} Retorna un mensaje con las instrucciones.
   */
  resetPassword(context: ResetPasswordContext): Observable<any> {
    return this.http.post(routes.reset_password(), JSON.stringify(context))
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return Observable.of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials {
    return this._credentials;
  }

  set guessCredentials(data: any) {
    const guess: Credentials = { username: 'Guess', token: 'asaa' };
    this.setCredentials(guess, false);
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      document.cookie = '';
    }
  }

}
