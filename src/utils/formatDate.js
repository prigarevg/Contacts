export default function formatDate(birthday, age) {
  const days = ["Вc", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  //Получение приписки к возрасту контакта
  function numWord(age) {
    let word;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
      word = "лет";
    } else {
      count = count % 10;
      if (count === 1) {
        word = "год";
      } else if (count >= 2 && count <= 4) {
        word = "года";
      } else {
        word = "лет";
      }
    }
    return age + " " + word;
  }
  if (!birthday) return "";
  const date = new Date(birthday);
  const dayOfWeek = date.getDay();
  const textAge = numWord(age);
  //Получение даты рождения в необходимом формате с определением AM/PM
  return (
    days[dayOfWeek] +
    ", " +
    ("0" + (1 + date.getUTCMonth())).slice(-2) +
    "/" +
    ("0" + date.getUTCDate()).slice(-2) +
    "/" +
    date.getUTCFullYear() +
    ", " +
    date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) +
    ", " +
    textAge
  );
}
