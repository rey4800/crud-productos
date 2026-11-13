import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


// Así es un producto (igual que la entidad de Spring Boot)
interface Producto {
  id?: number;      // el ? significa que es opcional (al crear aún no tiene id)
  nombre: string;
  precio: number;
}

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
 http = inject(HttpClient);
  url = 'http://localhost:8080/api/productos';

  productos = signal<Producto[]>([]);               // la lista de la tabla
  producto: Producto = { nombre: '', precio: 0 };   // el formulario

  ngOnInit() {
    this.listar();
  }

  // GET: trae todos los productos
  listar() {
    this.http.get<Producto[]>(this.url).subscribe(data => {
      this.productos.set(data);
    });
  }

  // POST si es nuevo, PUT si ya tiene id
  guardar() {
    if (this.producto.id) {
      this.http.put(`${this.url}/${this.producto.id}`, this.producto).subscribe(() => {
        this.limpiar();
        this.listar();
      });
    } else {
      this.http.post(this.url, this.producto).subscribe(() => {
        this.limpiar();
        this.listar();
      });
    }
  }

  // Pasa la fila seleccionada al formulario
  editar(p: Producto) {
    this.producto = { ...p };
  }

  // DELETE
  eliminar(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.listar();
    });
  }

  // Deja el formulario vacío
  limpiar() {
    this.producto = { nombre: '', precio: 0 };
  }
}
