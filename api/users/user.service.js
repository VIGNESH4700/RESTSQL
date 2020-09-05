const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    var datetime = new Date();
    pool.query(
      `
      insert into User values('${data.User_Name}','${data.First_Name}','${data.Middle_Name}','${data.Last_Name}','${data.Gender}','${data.Date_Of_Birth}','${datetime}');
      insert into User_Password(User_User_Name,User_Password,Password_Question,Password_Answer,Created_Date) values('${data.User_Name}','${data.User_Password}','${data.Password_Question}','${data.Password_Answer}','${datetime}')
      `,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }else{
          return callBack(null, results); 
        }
      }
    );
  }, 
  getUserByUserEmail: (username, callBack) => {
    pool.query(
      `select * from User_Password where User_User_Name = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select * from User_Password`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
