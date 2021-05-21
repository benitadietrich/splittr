import React, { useEffect, useState } from 'react'
import { Contains } from '../controller/Contains'
import {db} from "../backend/firebase"
import { Contact } from '../model/Contact'

const Overview = () => {

  const [contacts, setContacts] = useState<Contact[]>()

  useEffect(() => {
    let ref = db.collection('contacts');

    let unsubscribe = ref.onSnapshot(onCollectionUpdate);

    return () => {
        unsubscribe();
    }
}, [])

const onCollectionUpdate = (querySnapshot: any) => {

    setContacts([]);

    let fbContacts: Contact[] = [];

    querySnapshot.forEach((doc:any) => {
      fbContacts.push({
        id: doc.id,
        ...doc.data()
      });

    });

    setContacts(fbContacts)

}

    return (
      <div className="columns">
        <div className="column is-12 is-offset-1">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>salutation</th>
                <th>title</th>
                <th>gender</th>
                <th>firstname</th>
                <th>lastname</th>
              </tr>
            </thead>

            <tbody>

              {
              contacts && contacts.length > 0 &&

                contacts.map((r: Contact) => {
                    return (

                      <tr key={r.id} style={ Contains(contacts, r) ? {backgroundColor: "yellow"} : {backgroundColor: "white"} }>
                        <td>{`${r.id?.slice(0, 6)}...`}</td>
                        <td>{r.salutation?.value}</td>
                        <td>{r.title}</td>
                        <td>{r.gender}</td>
                        <td>{r.firstname}</td>
                        <td>{r.lastname}</td>
                      </tr>

                    )
                })}
            </tbody>

          </table>
        </div>
      </div>
    )
}

export default Overview
