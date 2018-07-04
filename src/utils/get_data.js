export function generateRandomPersonData(howMany) {
  const names = ['Alex', 'Jessie', 'Cheeto', 'Gordon']
  const cities = ['Boston', 'Northborough', 'Orlando', 'London']
  const specialties = ['Programmer', 'Groomer', 'Dog', 'Chef']
  const emails = ['ajstaples@gmail.com', 'jpaw1992@gmail.com', 'cheeto@charliecheeto.org', 'gordon_ramsey@lambsauce.com']
  let index = 1

  return Array.from({ length: howMany }, () => ({
    name: names[Math.floor(Math.random() * 4)],
    city: cities[Math.floor(Math.random() * 4)],
    specialty: specialties[Math.floor(Math.random() * 4)],
    email: emails[Math.floor(Math.random() * 4)],
    // id: Math.floor(Math.random() * 20)
    id: index++
  }))
}