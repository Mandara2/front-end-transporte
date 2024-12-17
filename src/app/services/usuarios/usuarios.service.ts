import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  list(): Observable<User[]> { //lista de teatros, observable es como una promesa
    console.log("si llegue");
    
    return this.http.get<User[]>(`${environment.url_ms_security}/api/users`); //Esto devuelve una lista de teatros
    
  }

  view(id: string): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/api/users/${id}`);
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/api/users`, user); //CentrosDistribucion es el body
  }
  update(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.url_ms_security}/api/users/${user._id}`,
      user
    );
  }
  delete(id: number) {
    return this.http.delete<User>(`${environment.url_ms_security}/api/users/${id}`);
  }
}
