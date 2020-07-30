module.exports = {
  age: function age(birth) {
    const today = new Date();
    const birthDay = new Date(birth);

    let age = today.getFullYear() - birthDay.getFullYear();
    const month = today.getMonth - birthDay.getMonth();
    const day = today.getDate() - birthDay.getDate();

    if (month < 0 || (month === 0 && day <= 0)) {
      return age - 1;
    }
    return age;
  },
};
