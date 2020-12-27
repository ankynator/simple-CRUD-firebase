# simple-CRUD-firebase
Aprendiendo firebase del canal de youtube FAST 
[Firebase Firestore CRUD con Javascript y HTML](https://www.youtube.com/watch?v=itNsRn1kjLU&t=2742s&ab_channel=FaztCode)

Aprendiendo firebase con un simple CRUD
### Resumen de los metodos basicos de firebase

1. Obtener toda la coleccion: 
  ```javascript
  db.collection('MyCollection').get()
  ```

2. Obtener un documento(fila) de la coleccion: 
  ```javascript
  db.collection('MyCollection').doc(id).get()
  ```
  
3. Escuchar si hubo un cambio en la coleccion: 
  ```javascript
  db.collection('MyCollection').onSnapshot(callback)
  ```

4. Borrar un documento de la coleccion: 
  ```javascript
  db.collection('MyCollection').doc(id).delete()
  ```

5. Actualizar un documento de la coleccion: 
  ```javascript
  db.collection('MyCollection').doc(id).update(updateDocument)
  ```
 
