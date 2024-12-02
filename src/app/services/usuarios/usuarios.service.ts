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

  view(id: string): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_negocio}/usuarios/${id}`);
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_negocio}/usuarios`, user); //CentrosDistribucion es el body
  }
  update(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.url_ms_negocio}/usuarios/${user._id}`,
      user
    );
  }
}
