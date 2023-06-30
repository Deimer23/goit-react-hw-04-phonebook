import React, {useEffect, useState} from "react";
import Section from "./Section/Section";
import Form from './Form/Form';
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
const App = ()=>{

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");  

  const search=(name)=>{
    let enc = 0;
    for (const contact of contacts) {
      if(contact.name === name.toUpperCase() ){
          enc = 1;
      }
    }
    return enc;
  }

 const  heandleSave=(e)=>{
    let enc;
    e.preventDefault();    
    const name = e.currentTarget.elements.name.value.toUpperCase();
    const number = e.currentTarget.elements.number.value;
    enc = search(name);
    if(enc === 1){
      alert(name + ' is already in contacts')
    }else{
      setContacts([...contacts, {id: 'id'+(contacts.length+1), name: name, number:number}]);     
    }
    e.target.reset();   
  }

  const heandleSevFilter=(e)=>{
    e.preventDefault();    
    const search = e.target.value;
    setFilter(search);      
  }

 const  handleDeleteContact = (e)=>{
    e.preventDefault();
    const id = e.target.dataset.id;
    setContacts(contacts.filter(contact=>(contact.id !== id)));   
  }

  useEffect(()=>{
    const listContact = JSON.parse(localStorage.getItem('contact'));
    if(listContact !== null){
      setContacts(listContact);     
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('contact', JSON.stringify(contacts));
    if(contacts.length === 0){
      localStorage.removeItem('contact')
    }
  },[contacts])

  // componentDidMount(){
  //   const listContact = JSON.parse(localStorage.getItem('contact'));
  //   if(listContact !== null){
  //     setContacts(listContact);     
  //   }
  // }

  // componentDidUpdate(prevState){
  //   const {contacts} = this.state;
  //   if(prevState.contacts !== contacts){
  //     localStorage.setItem('contact', JSON.stringify(contacts))
  //   }
  //   if(contacts.length === 0){
  //     localStorage.removeItem('contact')
  //   }

  // }
  
    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
       <Section tittle="Phonebook">
          <Form onSave={heandleSave} />
       </Section>
        <h5>Contacts</h5>
        <Filter filter={heandleSevFilter}/>
        <ContactList listContact={contacts} filter={filter} onDelete={handleDeleteContact}/>           
       
      </div>
    );  
};

export default App;