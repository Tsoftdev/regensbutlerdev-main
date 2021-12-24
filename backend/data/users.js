import bcrypt from "bcryptjs";

const users = [
  {
    vorname: "Bastian",
    nachname: "Jordan",
    adresse: "Tassilostrasse 5",
    adresszusatz: "1.OG",
    wohnort: "Donaustauf",
    plz: 93093,
    telefon: "0151/17269028",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    vorname: "John",
    nachname: "Doe",
    adresse: "Beispielstraße 10",
    adresszusatz: "5.Flur",
    wohnort: "Beispielort",
    plz: 93057,
    telefon: "015117269028",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    vorname: "Jim",
    nachname: "Doe",
    adresse: "Beispielstraße 8",
    adresszusatz: "4.Flur",
    wohnort: "Beispielort",
    plz: 93057,
    telefon: "015117269028",
    email: "jim@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
