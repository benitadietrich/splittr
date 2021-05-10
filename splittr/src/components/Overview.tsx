import React, { useEffect, useState } from 'react'
import { Contains } from '../controller/Contains'

const Overview = () => {

    useEffect(() => {
    
        return () => {
 
        }
    }, [])

    // TODO
    const [rtn1, setRtn1] = useState<any[]>([])

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
                <th>unformatted</th>
              </tr>
            </thead>

            <tbody>

              {
              rtn1.length > 0 &&

                rtn1.map(r => {
                  if (r.checked) {
                    return (

                      <tr style={ Contains(rtn1, r) ? {backgroundColor: "yellow"} : {backgroundColor: "white"} }>
                        <td>{`${r.id.toString().slice(0, 6)}...`}</td>
                        <td>{r.salutation}</td>
                        <td>{r.title}</td>
                        <td>{r.gender}</td>
                        <td>{r.firstname}</td>
                        <td>{r.lastname}</td>
                        <td>{r.unformatted}</td>
                      </tr>

                    )
                  } else {
                    <></>
                  }

                })}
            </tbody>

          </table>
        </div>
      </div>
    )
}

export default Overview
