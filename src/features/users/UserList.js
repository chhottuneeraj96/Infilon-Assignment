import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  console.log(entities);
  const loading = useSelector((state) => state.loading);
 

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      
      <div className="row">
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>avatar</th>
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id,email ,first_name,last_name,avatar}, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{email}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td><img src= {avatar} alt="W3Schools.com"/></td>
                    
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
