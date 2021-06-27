require('dotenv/config')
const mongoose = require('mongoose')
require('./index')

const Celeb = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

const celebs = [
  {
    name: 'Bruce Willis',
    occupation: 'Actor',
    image: 'https://globalnews.ca/wp-content/uploads/2021/01/bruce-willis.jpg?quality=85&strip=all&w=1200',
  },
  {
    name: 'Will Smith',
    occupation: 'Actor',
    image: 'https://www.pronto.es/uploads/s1/25/68/23/1/portada-will-smith.jpeg',
  },
  {
    name: 'Clint Eastwood',
    occupation: 'Actor',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Clint_Eastwood_at_2010_New_York_Film_Festival.jpg',
  },
  {
    name: 'Denzel Washington',
    occupation: 'Actor',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Denzel_Washington_%2829479254650%29_%28cropped%29.jpg',
  },
]

Celeb.create(celebs)
  .then(celebs => {
    Movie.create({
      title: 'Armageddon',
      genre: 'ciencia ficción y cine catástrofe de 1998',
      plot: 'https://www.encadenados.org/rdc/images/stories/rashomon/num_91/armageddon-0.jpg',
      cast: celebs[0]._id,
    }).catch(err => console.log(err))
    Movie.create({
      title: 'Soy leyenda',
      genre: 'de terror y ciencia ficción postapocalíptica',
      plot: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxwIC0XHYA59CjQ9ePO3QfKxf9Dp4v4G50zW-LI1XOCQy-oUPC',
      cast: celebs[1]._id,
    }).catch(err => console.log(err))
    Movie.create({
      title: 'Million dollar baby',
      genre: 'dramática',
      plot: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRVtzIC0O_F5DlMvQ0nFPe_-znoiBbloSKne006N42MEJRFRcFl',
      cast: celebs[2]._id,
    }).catch(err => console.log(err))
    Movie.create({
      title: 'El libro de Eli',
      genre: 'post-apocalíptica',
      plot: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfHLYPLjlojU_b8r__TIOa49A7Pl0TEgTlAKTWsnWb7Y3llH4',
      cast: celebs[3]._id,
    })
      .then(() => mongoose.connection.close())
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

mongoose.connection.on('disconnected', () => console.log('Tarea completada, desconectando'))
