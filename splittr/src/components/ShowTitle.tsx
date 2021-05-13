import React, { useEffect, useState } from 'react'
import { db } from '../backend/firebase';
import { Contains } from '../controller/Contains';
import { Contact } from '../model/Contact';
import { Title } from '../model/Title';

const ShowTitle = () => {

    const [titles, setTitles] = useState<Title[]>()

    useEffect(() => {
      let ref = db.collection('title');
  
      let unsubscribe = ref.onSnapshot(onCollectionUpdate);
  
      return () => {
          unsubscribe();
      }
  }, [])
  
  const onCollectionUpdate = (querySnapshot: any) => {
  
      setTitles([]);
  
      let fbtitles: Title[] = [];
  
      querySnapshot.forEach((doc:any) => {
        fbtitles.push({
          id: doc.id,
          ...doc.data()
        });      
  
      });
  
      setTitles(fbtitles)
  
  }

  const removeTitle = (id: string) => {

    db.collection("title").doc(id).delete()

  }

    return (
        <div className="columns">
        <div className="column is-12 is-offset-1">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Language</th>
                <th>Title</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>

              {
              titles && titles.length > 0 &&

                titles.map((r: Title) => {
                    return (

                      <tr key={r.id}>
                        <td>{`${r.id.slice(0, 6)}...`}</td>
                        <td>{r.lang}</td>
                        <td>{r.value}</td>
                        <td onClick={() => removeTitle(r.id)}><button className="button">Remove</button></td>
                      </tr>

                    )
                })}
            </tbody>

          </table>
        </div>
      </div>
    )
}

export default ShowTitle
