const getPateintDetails = {
  status: "success",
  data: [
    {
      firstName: "Nirmala",
      lastName: "Patil",
      cellNo: "8793031484",
      address: "MarketYard",
      bloodGroup: "O+",
      disease: "Nemonia",
      allotedDoctorName: "Vijay Goel",
      allotedDoctorCellNo: "8989898989",
      allotedWard: "A",
      allotedBed: "123",
      billAmount: "12500",
      paymentStaus: "paid",
    },
  ],
};
const getUser = {
  status: "success",
  data: [
    {
      firstName: "Nirmala",
      lastName: "Patil",
      cellNo: "8793031484",
      email: "deepak@gmail.com",
      password: "1234",
      role:"admin"
      
    },
  ],
};
/***************get employee details=========================== */
const getEmployeeDetails = {
  status: "success",
  data: [
    {
      empId:1,
      firstName: "Nirmala",
      lastName: "Patil",
      cellNo:"1234567891",
      role:"doctor",
      joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:2,
      firstName: "Dananjay",
      lastName: "Patil",
      cellNo:"1234567892",
      role:"ward_boy",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:3,
      firstName: "Urmila",
      lastName: "Patil",
      cellNo:"1234567893",
      role:"pateint",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:4,
      firstName: "Jayashree",
      lastName: "Patil",
      cellNo:"1234567894",
      role:"doctor",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:5,
      firstName: "Netaji",
      lastName: "Jawale",
      cellNo:"1234567895",
      role:"doctor",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:6,
      firstName: "Dattatray",
      lastName: "Wankhede",
      cellNo:"1234567896",
      role:"accountant",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },
    {
      empId:7,
      firstName: "archana",
      lastName: "Patil",
      cellNo:"1234567897",
      role:"reception",
     joinDate:"2021-12-12",
      salary:"23000",
      dob:"1989",

    },

  ],
};
export { getPateintDetails,getUser,getEmployeeDetails };
