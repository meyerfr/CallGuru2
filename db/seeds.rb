# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts('create Companies')
companies = Company.create([
  {
    name: 'CallGuru',
    website: 'www.callguru.de',
    branch: 'sales-enablement',
    description: "We enhance the performance of every sales team by providing a digital assistant with an intuitive call-guide, deeper insights and a shared knowledge space."
  },
  {
    name: 'Wunderpen',
    website: 'www.wunderpen.com',
    description: "Wir sind B2B Dienstleister und Experten für handschriftliche Mailings per Post."
  }
])

puts('create Users for CallGuru Company')
users = User.create!([
  {
    first_name: 'Fritz',
    last_name: 'Meyer',
    email: 'fritz.meyer@callguru.de',
    password: 'FritzMeyer',
    role: "CallGuru Admin",
    company_id: companies.first.id
  },
  {
    first_name: 'Leon',
    last_name: 'Primbas',
    email: 'leon.primbas@callguru.de',
    password: 'LeonPrimbas',
    company_id: companies.first.id
  },
  {
    first_name: 'Anna',
    last_name: 'Haake',
    email: 'anna.haake@callguru.de',
    password: 'AnnaHaake',
    company_id: companies.first.id
  },
  {
    first_name: 'Nick',
    last_name: 'Michi',
    email: 'nick.michi@callguru.de',
    password: 'NickMichi',
    role: "CallGuru Admin",
    company_id: companies.first.id
  }
])

# battle_cards = Battle.create([
#   {
#     title: 'BattleCard',
#     status: 'draft',
#     author: User.first.id,
#     published_on: Date.today,
#     analyse: {
#       clicked: 0,
#       good: 0,
#       bad: 0
#     }
#   },
# ])

# products = Product.create([

# ])

puts('create various ContentTypes')
# static content
header = ContentType.create(group: 'text', style: 'header')
subheader = ContentType.create(group: 'text', style: 'subheader')
paragraph = ContentType.create(group: 'text', style: 'paragraph')

bullet = ContentType.create(group: 'list', style: 'bullet')
numbered = ContentType.create(group: 'list', style: 'numbered')
toggle = ContentType.create(group: 'list', style: 'toggle')

img = ContentType.create(group: 'img')

# input content
input = ContentType.create(group: 'input', style: 'text', form_input: true)
number = ContentType.create(group: 'input', style: 'number', form_input: true)
date = ContentType.create(group: 'input', style: 'date', form_input: true)
range = ContentType.create(group: 'input', style: 'range', form_input: true)

simpleselect = ContentType.create(group: 'select', style: 'select', form_input: true)
dropdown = ContentType.create(group: 'select', style: 'dropdown', form_input: true)

multiselect = ContentType.create(group: 'multiselect', style: 'multiselect', form_input: true, complex: true)

outline = ContentType.create(group: 'outline', style: 'outline', form_input: false, complex: false)


puts('create demo Playbook for CallGuru')
demo_playbook = Playbook.create!(
  name: 'Demo',
  description: 'Dieses Playbook zeigt dir die Möglichkeiten die CallGuru bietet.',
  status: 'live',
  company_id: companies.first.id,
  owner_id: User.first.id,
  duration: 15,
  sections_attributes: [
    {
      title: 'Welcome',
      description: "Am 'Gatekeeper' vorbei kommen",
      status: 'live',
      order_no: 1,
      icon: 'door-open',
      content_blocks_attributes: [
        {
          text: 'Welcome',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Hello my name is XY',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'Assistance relationship',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'If you connect me to ABC, tell him that XY is waiting for him on the telephone line.',
              content_type_id: paragraph.id
            },
            {
              text: "I'll give you a quick cue: it's about the handwritten letter.",
              content_type_id: paragraph.id
            },
            {
              text: "I'll stay on the line then!",
              content_type_id: paragraph.id
            },
            {
              text: "Thank you very much for putting me through. Thank you.",
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'What is it about?',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: "It's about the handwritten letter from XY, then he already knows!",
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'If not in office',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              content_type_id: bullet.id,
              content_blocks_attributes: [
                {
                  text: 'When would you call again if you were me?',
                  content_type_id: paragraph.id
                },
                {
                  text: 'What extension would you use to reach him? ',
                  content_type_id: paragraph.id
                },
                {
                  text: "I would send him another email in advance, the email hasn't changed yet - is it still firstname.lastname@?",
                  content_type_id: paragraph.id
                }
              ]
            }
          ]
        },
        {
          text: 'Goodbye',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: "What was your name again? And your first name?",
              content_type_id: paragraph.id
            },
            {
              text: "Thank you a lot!",
              content_type_id: paragraph.id
            },
          ]
        },
      ]
    },
    {
      title: 'Der Aufbau',
      description: 'Erklärt den Aufbau von CallGuru',
      status: 'live',
      order_no: 2,
      icon: 'project-diagram'
      content_blocks_attributes: [
        {
          text: 'Team',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: "I would be interested to know if you know how you could improve the performance of your sales team.",
              content_type_id: paragraph.id
            },
            {
              text: "Would it be intersting for you to find out new ways of improving?",
              content_type_id: paragraph.id
            },
            {
              text: "what was the last thing you did to support your team?",
              content_type_id: paragraph.id
            },
            {
              text: "How did they like it?",
              content_type_id: paragraph.id
            },
            {
              text: "Just think about a solution which they appriciate to use and leads to a measurable performance boost es Sales team?",
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    },
    {
      title: 'Die Navigation',
      description: 'Erklärt die Navigation in der CallGuru App',
      status: 'live',
      order_no: 3,
      icon: 'route'
      content_blocks_attributes: [
        {
          text: 'Team',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'How big is your current sales team?',
              content_type_id: number.id
            },
            {
              text: 'Do you provide conversation scripts or guides for your agents?',
              content_type_id: simpleselect.id,
              content_blocks_attributes: [
                {
                  text: 'Yes',
                  content_type_id: paragraph.id
                },
                {
                  text: 'No',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'How do you provide the knowledge materials to your agents?',
              content_type_id: input.id
            },
            {
              text: "What's the share of unexperienced agents in you team?",
              content_type_id: range.id
            }
          ]
        }
      ]
    },
    {
      title: 'Knowledge Hub',
      description: 'Erklärt die Knowledge Hub der CallGuru App',
      status: 'live',
      order_no: 4,
      icon: 'brain',
      content_blocks_attributes: [
        {
          text: 'Find an appointment',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'From your point of view, when would you prefer us to talk again?',
              content_type_id: paragraph.id
            },
            {
              text: 'Is it better at the beginning or at the end of the week?',
              content_type_id: paragraph.id
            },
            {
              text: ' Would you prefer Wednesday or Friday?',
              content_type_id: paragraph.id
            },
            {
              text: ' In the morning or in the afternoon?',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'Schedule appointment',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'I would still have time at, say, 1pm, 2.30pm, 3.30pm or 5pm.',
              content_type_id: paragraph.id
            },
            {
              text: "If one of the dates fits, I'll post a date right away.",
              content_type_id: date.id
            }
          ]
        },
        {
          text: 'Video Call',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'I would suggest a video call, do you use Google Meet? Alternatively Zoom, Teams etc.',
              content_type_id: multiselect.id,
              content_blocks_attributes: [
                {
                  text: 'Zoom',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Google Meet',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Teams',
                  content_type_id: paragraph.id
                }
              ]
            }
          ]
        },
        {
          text: 'Appointment perparation',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'What can I possibly prepare before the next meeting?',
              content_type_id: paragraph.id
            },
            {
              text: "What needs to happen for our next appointment to be a success from your point of view?",
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    }
  ]
)

tags = Tag.create([
  {
    name: 'Marketing'
  },
  {
    name: 'Closing'
  },
  {
    name: 'Customers'
  }
])

