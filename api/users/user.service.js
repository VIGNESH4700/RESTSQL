const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    // insert into User_Location(User_User_Name,Country,State,Address_1,City/Village,Pin_Code,Created_Date) values('${data.User_Name}','${data.Country}','${data.State}','${data.Address_1}','${data.City}','${data.Pin_Code}','${datetime}');
    var datetime = new Date();
    pool.query(
      `
      insert into User values('${data.User_Name}','${data.First_Name}','${data.Middle_Name}','${data.Last_Name}','${data.Gender}','${data.Date_Of_Birth}','${datetime}');
      insert into User_Password(User_User_Name,User_Password,Password_Question,Password_Answer,Created_Date) values('${data.User_Name}','${data.User_Password}','${data.Password_Question}','${data.Password_Answer}','${datetime}');
      
      insert into User_Email(User_User_Name,User_Email,Alternative_Mail_Id,Created_Date) values('${data.User_Name}','${data.User_Email}','${data.Alternative_Mail_Id}','${datetime}');
      insert into User_Contact(User_User_Name,Phone_Number,Alternative_Phone_Number,Land_Line_Number,Created_Date) values('${data.User_Name}','${data.Phone_Number}','${data.Alternative_Phone_Number}','${data.Land_Line_Number}','${datetime}');
      insert into User_Photo(User_User_Name,User_Photo_Inserted_Time) values('${data.User_Name}','${datetime}');
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
  getUserByUserId: (username, callBack) => {
    pool.query(
      `select * from User where User_Name = ?`,
      [username],
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
      `select * from User`,
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
      `update User_Password set User_Password='${data.User_Password}' where User_User_Name = '${data.User_Name}'`,
      [],
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
      `
      delete from User where User_Name = '${data.User_Name}';
      `,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error); 
        }
        return callBack(null, results.affectedRows);
      } 
    );
  }
};