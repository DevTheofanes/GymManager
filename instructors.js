const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

exports.show = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at
    ),
  };

  return res.render("instructors/show", { instructor });
};

exports.index = function (req, res) {
  const instructors = data.instructors;
  return res.render("instructors/index", { instructors: data.instructors });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (!req.body[key]) return res.send("Please, fill all fields");
  }

  let { avatar_url, name, birth, gender, services } = req.body;

  birth = Date.parse(birth);
  const id = Number(data.instructors.length + 1);
  const created_at = Date.now();

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error writing file");

    return res.redirect("/instructors");
  });
};

exports.update = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render("instructors/update", { instructor });
};

exports.put = function (req, res) {
  const { id } = req.body;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send("Instructor not found");
  }

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
  };

  data.instructors[id - 1] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error Wrinting File");
    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error File");

    return res.redirect("/instructors");
  });
};
