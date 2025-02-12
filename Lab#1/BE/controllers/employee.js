const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  // const targetId = parseInt(req.params.id)
  let targetId = req.params.id;
  const index = employee.findIndex(emp => emp.id === targetId);
   if (index === -1) {
    return res.status(404).json({ message: "employee not found" });
  }
  employee.splice(index, 1); 
  return res.status(200).json({ message: "emplyoee deleted successfully", employee });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id , name } = req.body;
  if (!name || !id) {
    // 400: bad req status code
    return res.status(400).json({ message: "id or name are missing" });
  }
  const employeeExists = employee.some((emp) => emp.id == id);
  if (employeeExists) {
    // 409: conflict status code
    return res.status(409).json({ message: "employee with same id exists" });
  }
  employee.push({ id, name });
  return res.status(201).json({ message: "employee created successfully", employee });
};
