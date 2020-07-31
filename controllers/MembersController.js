const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.show = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) {
    return res.send("Member not found");
  }

  const member = {
    ...foundMember,
    age: age(foundMember.birth),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at),
  };

  return res.render("members/show", { member });
};

exports.index = function (req, res) {
  return res.render("members/index", { members: data.members });
};

exports.create = function (req, res) {
  return res.render("members/create");
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (!req.body[key]) return res.send("Please, fill all fields");
  }

  birth = Date.parse(req.body.birth);

  let id = 1;

  const lastMember = data.members[data.members.length - 1];

  if (lastMember) {
    id = lastMember.id + 1;
  }

  console.log(lastMember, id);

  data.members.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error writing file");

    return res.redirect("/members");
  });
};

exports.update = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) {
    return res.send("Member not found");
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return res.render("members/update", { member });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, indexMember) {
    if (member.id == id) {
      index = indexMember;
      return true;
    }
  });

  if (!foundMember) {
    return res.send("Member not found");
  }

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error Wrinting File");
    return res.redirect(`/members/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function (member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error File");

    return res.redirect("/members");
  });
};
