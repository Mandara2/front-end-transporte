import { Component, OnInit } from '@angular/core';
import { error, log } from 'console';
import { ChatService } from 'src/app/services/chat/chat-service.service';
import { SecurityService } from 'src/app/services/security.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  chatIniciado = false;  // Bandera que indica si el chat ha sido iniciado
  usuarioLogueado: any;
  nuevoMensaje: string = "";
  destinatarioSeleccionado: string = "";
  telefonoUsuarioLogueado: string = "";
  mensajes: any = [
    /* {
      emisor: "6728104942576666a8869268",
      texto: "Holaaaa"
    },
    {
      emisor: "6728e7a3bc0f3e155b567b24",
      texto: "holi"
    },
    {
      emisor: "6728104942576666a8869268",
      texto: "juas"
    },
    {
      emisor: "6728e7a3bc0f3e155b567b24",
      texto: "juas"
    },
    {
      emisor: "6728104942576666a8869268",
      texto: "juasjuas"
    }, */
  ];

  constructor(private securityService: SecurityService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.securityService.getUser().subscribe(usuario => {
      this.usuarioLogueado = usuario;
      console.log("Este es el usuario logueado:");
      console.log(this.usuarioLogueado);

      this.cargarTelefonoUsuario();
    });
  }

  // Método para verificar si el destinatario existe
  verificarUsuario(destinatario: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.chatService.buscarUsuarioPorTelefono(destinatario).subscribe({
        
        
        next: (response) => {
          // Si el usuario se encuentra, resuelve la promesa con true
          resolve(true);
        },
        error: (err) => {
          // Si no se encuentra el usuario, resuelve la promesa con false
          resolve(false);
        }
      });
    });
  }
  
  

  // Método que se ejecuta al hacer clic en el ícono del chat
  abrirChat() {
    this.mostrarChat = true;
  }

  // Método que se ejecuta al presionar el botón de "Iniciar Chat"

  async iniciarChat() {
    console.log('Verificando usuario...');
    const usuarioExiste = await this.verificarUsuario(this.destinatarioSeleccionado);
    console.log('Resultado de verificarUsuario:', usuarioExiste);
    
    if (usuarioExiste) {
      this.chatIniciado = true;
      console.log('Chat iniciado');
      
      // Cargar los mensajes al iniciar el chat
      this.cargarMensajes();  // Llamamos a cargarMensajes aquí
    } else {
      console.log('Mostrando alerta');
      Swal.fire("Error", "No se pudo encontrar el teléfono, prueba otra vez", "error");
    }
  }
  
  

  // Método para enviar mensaje
  enviarMensaje() {
    if (this.nuevoMensaje.trim() === "") return;
  
    // Crear el objeto del mensaje para enviar al backend
    const mensaje = {
      telefono_remitente: this.telefonoUsuarioLogueado,
      telefono_destinatario: this.destinatarioSeleccionado,
      contenido: this.nuevoMensaje
    };
  
    // Llamar al servicio para enviar el mensaje
    this.chatService.enviarMensaje(mensaje).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Mensaje enviado:', response.chat);
          this.mensajes.push({
            telefono_remitente: this.telefonoUsuarioLogueado,
            telefono_destinatario: this.destinatarioSeleccionado,
            contenido: this.nuevoMensaje,
            created_at: new Date() // Agregar fecha local para mostrar inmediatamente
          });
          this.nuevoMensaje = ""; // Limpiar el campo de texto
  
          setTimeout(() => {
            this.scrollToTheLastElementByClassName();
          }, 30);
        } else {
          Swal.fire("Error", "No se pudo enviar el mensaje", "error");
        }
      },
      error: (err) => {
        console.error('Error al enviar el mensaje:', err);
        Swal.fire("Error", "Ocurrió un error al enviar el mensaje", "error");
      }
    });
  }

  cargarMensajes() {
    const telefonoDestinatario = this.destinatarioSeleccionado;  // El número de teléfono del destinatario
    const telefonoRemitente = this.telefonoUsuarioLogueado; // El número de teléfono del remitente (usuario logueado)
  
    this.chatService.obtenerMensajes(this.telefonoUsuarioLogueado, this.destinatarioSeleccionado).subscribe({
      next: (response) => {
        if (response.success) {
          // Asegurarse de que los mensajes se convierten a un array
          this.mensajes = Array.isArray(response.mensajes) ? response.mensajes : [response.mensajes];
          console.log('Mensajes cargados:', JSON.stringify(this.mensajes, null, 2));
          
        } else {
          Swal.fire("Error", "No se pudieron cargar los mensajes", "error");
        }
      },
      error: (err) => {
        console.error('Error al cargar los mensajes:', err);
        Swal.fire("Error", "Ocurrió un error al cargar los mensajes", "error");
      }
    });
  }

  cargarTelefonoUsuario() {
    // Supongamos que el usuario logueado tiene un atributo `id`
    const userId = this.usuarioLogueado._id;
    console.log("usuarioID " + userId);
    
  
    this.chatService.obtenerTelefono(userId).subscribe({
      next: (response) => {
        if (response.telefono) {
          this.telefonoUsuarioLogueado = response.telefono;
          console.log('Teléfono del usuario logueado:', this.telefonoUsuarioLogueado);
        }
      },
      error: (err) => {
        console.error('Error al obtener el teléfono del usuario logueado', err);
      }
    });
  }
  

  // Método para hacer scroll hasta el último mensaje
  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    let toppos = ultimo.offsetTop;
    document.getElementById('contenedorDeMensajes').scrollTop = toppos;
  }

  volverASeleccionarDestinatario() {
    
    this.chatIniciado = false;
    this.destinatarioSeleccionado = "";
    this.mensajes = [];
  }

  formatFecha(fecha: string | Date): string {
    const fechaObjeto = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return fechaObjeto.toLocaleDateString('es-ES', opciones);
  }
}
