# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Organization.create([
    {name: 'Bobs Burgers',
        hourly_rate: 9,
        description: 'its the place from that cartoon with the guy who plays the voice of sterling archer'},
        {name: 'Amazon',
            hourly_rate: 15,
            description: 'its the place from the internet that used to sell books but now they sell everything in the world to everyone in the world'},
            {name: 'workforce.com',
                hourly_rate: 1000,
                description: 'best company best people!'}
        ])