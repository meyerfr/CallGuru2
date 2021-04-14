# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

companies = Company.create([
  {
    name: 'CallGuru',
    website: 'www.callguru.de',
    branch: 'sales-enablement',
    description: "We enhance the performance of every sales team by providing a digital assistant with an intuitive call-guide, deeper insights and a shared knowledge space.",
    account_manager: UserId
  },
  {
    name: 'Wunderpen',
    website: 'www.wunderpen.com',
    description: "Wir sind B2B Dienstleister und Experten für handschriftliche Mailings per Post.",
    account_manager: UserId
  }
])

users = User.create([
  {
    first_name: 'Fritz',
    last_name: 'Meyer',
    email: 'fritz.meyer@callguru.de',
    password: 'FritzMeyer',
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
    company_id: companies.first.id
  }
])

battle_cards = Battle.create([
  {
    title: 'BattleCard',
    status: 'draft',
    author: User.first.id,
    published_on: Date.today,
    analyse: {
      clicked: 0,
      good: 0,
      bad: 0
    }
  },
])

products = Product.create([

])

default = ContentType.create(name: 'default')
text = ContentType.create(name: 'text')
number = ContentType.create(name: 'number')
bullet = ContentType.create(name: 'bullet list')
numbered_list = ContentType.create(name: 'numbered list')
multiple_select = ContentType.create(name: 'multiple select')
dropdown = ContentType.create(name: 'dropdown')
simple_select = ContentType.create(name: 'simple select')
photo = ContentType.create(name: 'photo')
header = ContentType.create(name: 'header')
subheader = ContentType.create(name: 'subheader')
check = ContentType.create(name: 'check')

demo_playbook = Playbook.create(
  name: 'Demo',
  description: 'Dieses Playbook zeigt dir die Möglichkeiten die CallGuru bietet.',
  status: 'public',
  section: [
    {
      title: 'Welcome',
      description: "Am 'Gatekeeper' vorbei kommen",
      status: 'public',
      order_no: 1,
      outlines: [
        {
          title: 'Greet the Customer'
          content_blocks: [
            {
              text: 'Willkomen im Call, in diesem Playbook werden wir dir dich durch die Funktionen von CallGuru führen.',
              content_type_id: default.id
            },
            {
              text: 'Klicke auf den Pfeil rechts unten, um in die nächste Sektion zu kommen.',
              content_type_id: default.id
            },
          ]
        }
      ]
    },
    {
      title: 'Der Aufbau',
      description: 'Erklärt den Aufbau von CallGuru',
      status: 'public',
      order_no: 1,
      outlines: [
        {
          title: 'Greet the Customer'
          content_blocks: [
            {
              text: 'Super also lass uns starten - hier kurz der generelle Aufbau:'
              content_type_id: default.id
            },
            {
              text: 'Auf der Playbook Übersicht, über die Du gerade auch diesen Call gestartet hast, siehst du alle deine Playbooks und kannst über das Plus Symbol auch neue Playbooks hinzufügen.',
              content_type_id: numbered_list.id
            },
            {
              text: 'Ein CallGuru Playbook besteht aus einzelnen Sektionen die nacheinander wärend dem Call durchlaufen werden.',
              content_type_id: numbered_list.id
            },
            {
              text: 'Eine Sektion besteht aus einer Überschrift und einem Skript darunter, nur der Skripttext soll während dem Gespräch genutzt werden.',
              content_type_id: numbered_list.id
            },
          ]
        }
      ]
    }
  ]
)
