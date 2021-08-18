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
  },
  {
    name: 'Afilio',
    website: 'www.afilio.de',
    description: "Nicht vorsorgen ist auch keine Lösung. 10 Minuten Zeit nehmen - 10 Jahre Ruhe haben. Haken Sie das Thema Vorsorge schnell und einfach ab."
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

img = ContentType.create(group: 'img', style: 'img')
img = ContentType.create(group: 'link', style: 'link')

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
      icon: 'project-diagram',
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
      icon: 'route',
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






# create Afilio






outline = ContentType.find_by(style: 'outline')
paragraph = ContentType.find_by(style: 'paragraph')
bullet = ContentType.find_by(style: 'bullet')
numbered = ContentType.find_by(style: 'numbered')
multiselect = ContentType.find_by(style: 'multiselect')
simpleselect = ContentType.find_by(style: 'select')
text = ContentType.find_by(style: 'text')
link = ContentType.find_by(style: 'link')

afilio = Company.find_by(name: 'Afilio')

puts('create Jan Remek for Afilio Company')
jan = User.new(
    first_name: 'Jan',
    last_name: 'Remek',
    email: 'jan.remek@outlook.com',
    role: "Account Manager",
    company_id: afilio.id
  )

jan.skip_password_validation = true
jan.save

afilioPlaybook = Playbook.create!(
  name: 'Pflegevorsorge Low Intent Script',
  description: 'Cold Call Low Intent Leads zum Thema Pflege',
  status: 'live',
  company_id: afilio.id,
  owner_id: afilio.users.first.id,
  duration: 20,
  sections_attributes: [
    #section
    {
      title: 'Gesprächseröffnung',
      description: "",
      status: 'live',
      order_no: 1,
      icon: "fa-door-open",
      content_blocks_attributes: [
        #outline
        {
          text: 'Bezug zu Afilio und Agent aufbauen',
          content_type_id: outline.id,
          #paragraph || input || range
          content_blocks_attributes: [
            {
              text: 'Einen Schönen guten Tag Frau Müller,',
              content_type_id: paragraph.id
            },
            {
              text: 'Jens Schimpf mein Name von Afilio der Gesellschaft für Vorsorge. Ich Grüße Sie',
              content_type_id: paragraph.id
            },
            {
              text: 'Frau Müller, ich weiß ich überrumpel Sie gerade ein bisschen …. ich möchte Sie auch nicht lange ihrer kostbaren Zeit berauben. Sie hatten sich bei uns auf afilio.de eine Patientenverfügung erstellt und sich im allgemeinen sehr erfolgreich dem Thema der Vorsorge gewidmet …. Ich hoffe Sie können mich da zuordnen?',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'Lead loben für aktive Vorsorgeregelung',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Wirklich ein großes Lob an Sie, dass Sie das so proaktiv angehen, das schiebt man bekanntlicher Maßen ja gerne mal auf die etwas längere Bank.',
              content_type_id: paragraph.id
            }
          ]
        },
        #outline
        {
          text: 'Konversation mit einer offenen Frage beginnen',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Frau Müller, ich bin von Afilio Experte für die Pflege- und Bestattungsvorsorge, das ist auch der Grund warum ich mich bei Ihnen melde. Sie hatten nämlich neben den Vorsorgedokumente auch einen Blick in die Pflegevorsorge gewagt und sich einmal die Kosten im Falle einer Pflegebedürftigkeit ausgerechnet. Das ist ja durchaus etwas komplizierter und wird zur Zeit ja auch kontrovers diskutiert. Wie kam es dazu, dass Sie sich damit befasst haben, wurden Sie denn selber schonmal mit dem Thema in der Familie konfrontiert?',
              content_type_id: paragraph.id
            }
          ]
        },
        #outline
        {
          text: 'Pitch zur Problematik der Pflegevorsorge',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Und kennen Sie sich schon etwas  damit aus wie die Pflege in Deutschland geregelt wird? Worauf man da so achten muss?',
              content_type_id: paragraph.id
            },
            {
              text: 'Tatsächlich ist es schwierig zu verstehen wie die Pflege in Deutschland geregelt wird gerade in Hinblick auf die Frage “Ob man es sich überhaupt noch leisten kann nach seinen Wünschen und Vorstellungen gepflegt zu werden und ob es eventuell Sinn macht für den Fall Vorzusorgen”',
              content_type_id: paragraph.id
            },
            {
              text: 'Fakt ist leider, dass die gesetzliche Pflegekasse nur einen kleinen Teil der Pflegekosten übernimmt. Bedeutet wenn wir einmal Pflegebedürftig werden müssen wir jeden Monat einen Großteil unserer Rente, wenn nicht sogar alles dafür aufbringen.',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: 'Pitch zur individuellen Beratung',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Wissen Sie ungefähr wie Hoch die Kosten in Ihrem Bundesland sind?',
              content_type_id: paragraph.id
            },
            {
              text: 'Tatsächlich liegen die Kosten die Sie privat zahlen müssten bei bis zu XX € im Monat',
              content_type_id: paragraph.id
            },
            {
              text: 'Können Sie ungefähr einschätzen wie hoch die Wahrscheinlichkeit ist einmal Pflegebedürftig zu werden?',
              content_type_id: paragraph.id
            },
            {
              text: 'Schockierenderweise liegt die Wahrscheinlichkeit hier sogar bei 50% für die Männer und bei über 70% bei den Frauen.',
              content_type_id: paragraph.id
            },
            {
              text: 'Aus diesem Grund empfehlen wir sich einmal mit der Pflegevorsorge zu befassen um die Kontrolle über die Lebensqualität und die Unabhängigkeit im Alter zu bewahren',
              content_type_id: paragraph.id
            },
            {
              text: 'Was man an der Stelle wirklich stark betonen muss, ist das die die Pflegevorsorge von Person zu Person unterschiedlich ist, da sollte man unbedingt immer auf die individuelle Situation schaun.',
              content_type_id: paragraph.id
            },
            {
              text: 'Aus dem Grund haben wir uns bei Afilio auf die pflegevorsorge spezialisiert, damit wir ausschließlich unseren Nutzern mit der besten expertise zur Seite stehen können.',
              content_type_id: paragraph.id
            },
            {
              text: 'Wenn Sie mir noch ein wenig Ihrer Zeit schenken, würde Ihnen gerne anbieten, dass wir gemeinsam Ihre Situation anschauen um zu gucken',
              content_type_id: paragraph.id
            },
            {
              content_type_id: numbered.id,
              content_blocks_attributes: [
                {
                  text: 'wie wird die Pflege in Deutschland geregelt also worauf müssen Sie achten! ',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Lohnt es sich für Sie überhaupt privat vorzusorgen und',
                  content_type_id: paragraph.id
                },
                {
                  text: "wenn das der Fall ist wie gestaltet man das am besten aus? Nicht das Sie zu viel oder zu wenig absichern",
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Dann haben Sie den Vorteil, dass Sie kostenlos und unverbindlich selber zum Experten gemacht werden und vor allem erlangen Sie Gewissheit darüber ob Sie überhaupt vorsorgen sollten!',
              content_type_id: paragraph.id
            }
          ]
        },
        #outline
        {
          text: 'Opt-In vom Kunden erhalten',
          content_type_id: outline.id,
          content_blocks_attributes: [
              #bullet || numbered || simpleselect || multiselect
            {
              text: 'Würde Ihnen das passen?',
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    },
    #section
    {
      title: 'Pflegevorsorge: Persönlicher Bezug, Problem und Lösung:',
      description: '',
      status: 'live',
      order_no: 2,
      icon: "fa-hand-holding-medical",
      content_blocks_attributes: [
        # outline
        {
          text: 'Bezug zur Thematik und Beweggründe des Nutzers herausfinden:',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Wie ist das denn Frau Müller, kennen Sie sich schon etwas mit der Pflegevorsorge aus, wissen Sie wie das aktuell in Deutschland geregelt wird? ',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Pflegesystem in Deutschland erklären ",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Aktuell ist es leider so, dass immer mehr Menschen einmal Pflegebedürftig werden, wir leben ja auch in einer alternden Gesellschaft. Aktuell sind über 3.9 Millionen deutsche Pflegebedürftig und wir hatten ja bereits darüber gesprochen wie wahrscheinlich es ist selber einmal Pflegebedürftig zu werden. Wir kommen also eigentlich nicht wirklich drum herum, dass wir früher oder später mit dem Thema einmal konfrontiert werden.',
              content_type_id: paragraph.id
            },
            {
              text: 'Sollten Sie jetzt zum Beispiel durch einen Unfall oder einfach im Zuge des älterwerdens pflegebedürftig werden, dann können Sie bei Ihrer Pflegekasse die Einstufung in einen der fünf Pflegegrade beantragen. Haben Sie von den Pflegegraden schon mal etwas gehört? ',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Gesellschaftliche Problematik: (Anstieg Pflegekosten, Pflegenotstand) ",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Die Pflegegrade bestimmen letzten Endes die schwere der Pflegebedürftigkeit, sie sind die Grundlage des Pflegesystems in Deutschland. Je nachdem welchen Pflegegrad Sie erhalten und ob Sie zuhause oder im Heim Heim gepflegt werden, erhalten Sie dann von der Pflegekasse einen monatlichen Beitrag als Unterstützung ausgezahlt.',
              content_type_id: paragraph.id
            },
            {
              text: 'Jetzt ist es leider so, dass die Kosten für die Pflege rapide ansteigen und die gesetzliche',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Individuelle Problematik verdeutlichen (hohe Kosten, Belastung der Familie)",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: "Pflegekasse nur circa. 50% der anfallenden Kosten abdeckt, mit anderen Worten, im Falle einer Pflegebedürftigkeit bleiben teilweise hohe Kosten jeden Monat bei Ihnen privat hängen.",
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Lösung: Die Individuelle Pflegevorsorge für den Preis eines Handyvertrages",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Hier würde ich gerne einmal schauen wie hoch diese Kosten in Ihrem fall ausfallen würden und ob Sie diese gut selber tragen können oder ob es gegebenenfalls sinnvoll wäre Sie mithilfe einer privaten Pflegevorsorge zu entlasten.',
              content_type_id: paragraph.id
            },
            {
              text: 'Hier stell ich Ihnen gleich ein paar Fragen um Ihre Situation etwas besser einschätzen zu können,',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Feedback einholen & Überleitung zur Bedarfsermittlung",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Bevor wir weitermachen, war alles bis jetzt soweit verständlich?',
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    },
    #section
    {
      title: 'Bestandsaufnahme',
      description: '',
      status: 'live',
      order_no: 3,
      icon: "fa-question-circle",
      content_blocks_attributes: [
        # outline
        {
          text: 'Individuelle Bedarfsermittlung:',
          content_type_id: outline.id
        },
        {
          text: "Frage + Erläuterung: Chronische Erkrankung ",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Haben Sie chronische Erkrankungen, körperliche Einschränkungen oder Behinderungen?',
              content_type_id: simpleselect.id,
              content_blocks_attributes: [
                {
                  text: 'chronisch erkrankt',
                  content_type_id: paragraph.id
                },
                {
                  text: 'körperlich eingeschränkt',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Behinderung',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Gesund',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Top Fit! Ja Super das freut mich zu hören, dann haben wir hier auch die komplette Klaviatur an Möglichkeiten, das ist leider nicht jedem vergönnt.',
              content_type_id: paragraph.id
            },
          ]
        },
        {
          text: "Frage + Erläuterung: Bundesland",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Ich sehe gerade Sie leben in Hamburg, möchten Sie da auch alt werden?',
              content_type_id: simpleselect.id,
              content_blocks_attributes: [
                {
                  text: 'Ja',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Nein',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Schön! Ich frage das ganze deswegen, weil die Kosten wirklich sehr stark variieren, in Hamburg ist die Pflege leider recht teuer.',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Frage + Erläuterung: Eigenheim / Immobilien",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Leben Sie denn in Hamburg im Eigenheim oder haben Sie Immobilien?',
              content_type_id: simpleselect.id,
              content_blocks_attributes: [
                {
                  text: 'Eigenheim',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Immobilien',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Okay, das ist natürlich ein Faktor den wir auch berücksichtigen sollten.',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Frage + Erläuterung: Familienstand (Beziehungsstatus, Kinder)",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Können Sie mir etwas über ihre Lebenssituation erzählen, sind Sie verheiratet? Kinder?',
              content_type_id: multiselect.id,
              content_blocks_attributes: [
                {
                  text: 'Verheiratet',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Ledig',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Kinder',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Ich frage das ganze deswegen weil die Pflegevorsorge immer auch ein Familienthema ist, da sprechen wir natürlich gerade bei Eheleuten auch von rechtlichen und finanziellen Verpflichtungen. Von daher ist es wichtig das wir in Ihrem Fall sowohl für Sie als auch für Ihren Mann schauen sonst gehen wir hier vom Regen in die Traufe.',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Frage + Erläuterung: Netto Renteneinnahmen & Kostenabschätzung",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Können Sie bereits einschätzen wie hoch Ihr Renteneinkommen einmal ausfallen wird? Okay, kommen da noch betriebliche oder private Renten dazu?',
              content_type_id: text.id
            },
            {
              text: 'So und zum Schluss nun die wichtigste Frage.',
              content_type_id: paragraph.id
            }
          ]
        },
        {
          text: "Frage + Erläuterung: Wünsche / Sorgen in Bezug auf die Pflege",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Haben Sie denn besondere Wünsche in Bezug auf Ihre Pflege? (Pflege Zuhause oder im Heim?)',
              content_type_id: text.id
            }
          ]
        },
        {
          text: "Frage: Finanziellen Rahmen abstecken",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Okay, wenn wir jetzt später nach einer Absicherung schauen sollten, können Sie mir da verraten in welchem finanziellen Rahmen wir uns am besten bewegen sollten?',
              content_type_id: text.id
            },
            {
              text: 'Klasse Frau Müller, jetzt sind wir auch durch mit der Fragerei und wir können gemeinsam schauen wie sich denn die Pflegekosten bei Ihnen in Hamburg überhaupt verhalten. Das was wir uns jetzt anschauen ist der sogenannte Eigenanteil also tatsächlich die Kosten die auf Ihren privaten Schultern lastet, sollten Sie einmal pflegebedürftig werden, da ist das Geld der Pflegekasse bereits eingerechnet. Das ist soweit verständlich?',
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    },
    {
      title: 'Pflegegrade erstellen und erklären:',
      description: '',
      status: 'live',
      order_no: 4,
      icon: "fa-address-card",
      content_blocks_attributes: [
        # outline
        {
          text: 'Pflegegrad 1 bis 5 erklären und Aufteilung sowie Absicherung festlegen',
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Erster Pflegegrad',
              content_type_id: outline.id,
              content_blocks_attributes: [
                {
                  text: 'Also Frau Müller beginnen wir beim ersten Pflegegrad, hier muss man sich an und für sich keine großen Sorgen machen. Tatsächlich ist es so, dass Sie im ersten Pflegegrad keinerlei Einschränkung in Ihrer Alltagskompetenz haben. In der Regel fallen hier zum Beispiel Kosten für vermehrte Taxi fahrten zum Arzt oder eine Unterstützung im Haushalt an. Hier müssen Sie damit rechnen das Sie circa 300 € im Monat privat noch tragen müssen.',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Hier würde ich Ihnen 150€ zusätzlich absichern',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Zweiter Pflegegrad',
              content_type_id: outline.id,
              content_blocks_attributes: [
                {
                  text: 'Im zweiten Pflegegrad ist das ganze schon eine etwas ander Nummer, hier reden wir von einer tatsächlichen Pflegebedürftigkeit. Da haben Sie auch schon eine erhebliche Beeinträchtigung der Selbständigkeit, bedeutet sie bewegen sich eventuell mithilfe eines Rollators vort und der ambulante Pflegedienst kommt hier mehrfach die Woche zur Hilfe. Hier können Sie mit der richtigen Unterstützung aber sehr gut zuhause gepflegt werden, allerdings muss man davon ausgehen, dass hier jeden Monat nochmal Kosten in Höhe von 800 € auf Sie zukommen.',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Hier würde ich Ihnen 500€, also den Mammutanteil absichern, dass wir auch wirklich gewährleisten können das Sie im 2 Pflegegrad auch gut Zuhause gepflegt werden können.',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Klingt das soweit schlüssig für Sie?',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Dritter Pflegegrad',
              content_type_id: outline.id,
              content_blocks_attributes: [
                {
                  text: 'Im dritten Pflegegrad,sind wir jetzt wirklich auf Messers Schneide hier kann ich Ihnen auch nicht garantieren das die Pflege zuhause noch gut umsetzbar ist, denn zum 3. Pflegegrad gehört unter anderem auch eine Demenz und das ist wirklich schon sehr aufwändig! Wenn Sie zuhause gepflegt werden müssen Sie damit rechnen, dass der Pflegedienst wirklich bis zu 4 mal am Tag vorbei kommt, daher sind die Kosten hier auch deutlich höher, da müssen Sie mit 1000 € rechnen. Damit Sie hier aber später die Wahl haben würde ich Ihnen gerne beide Szenarien absichern. Für die pflege Zuhause würde ich Ihnen 700€ von den 1000€ Eigenanteil absichern. Zeitgleich würde ich aber auch einmal schauen wie die Kosten in einer professionellen Unterbringung ausfallen.',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Haben Sie hier einmal Ihre Postleitzahl?',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Also ich sehe hier gerade bei ihnen gibt es als Beispiel die Villa Sibilla, das schaut wirklich gut aus. Kenn Sie die Unterbringung?  ',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Hier müssten Sie einen Eigenanteil von mindestens 1900€  monatlich zahlen wenn Sie aber als Beispiel ein Einzelzimmer wollen, würde das entsprechend nochmal ansteigen. Sie können hier also von einem Eigenanteil von gut und gerne 2500 € ausgehen. In einem Szenario wo Sie in eine professionelle Unterbringung gehen müssten können Sie natürlich einen großteil Ihrer rente verwenden von daher entsteht bei ihnen wirklich nur eine Lücke von 1000€ und die würde ich Ihnen hier auch im dritten Pflegegrad für die stationäre Pflege absichern. ',
                  content_type_id: paragraph.id
                }
              ]
            },
            {
              text: 'Vierter & fünfter Pflegegrad',
              content_type_id: outline.id,
              content_blocks_attributes: [
                {
                  text: 'Wenn wir uns jetzt in den 4. und 5. Pflegegrad anschauen dann muss man wirklich sagen das wir hier vom Härtefall ausgehen, tatsächlich haben auch nur circa 14% aller Pflegebedürftigen einen der beiden Pflegegrade. Damit Sie sich etwas darunter vorstellen können, im 4. Pflegegrad sind sie komplett immobil durch zum Beispiel eine Querschnittslähmung und im 5. Pflegegrad sind sie immobil und dazu noch geistig eingeschränkt durch eine Demenz. Hier gehen wir also wirklich von einem Szenario aus in dem Sie nicht sonderlich gut Zuhause gepflegt werden können. Dementsprechend würde ich hier nur die Kosten in der stationären Pflege für Sie abdecken und die sind tatsächlich dank der Reform von 2017 vom 2. bis zum 5 Pflegegrad gleichbleibend bedeutet hier müssen wir genau wie im 3. Pflegegrad auch die 1000 € absichern',
                  content_type_id: paragraph.id
                },
                {
                  text: 'Frau Müller, das waren jetzt wirklich viele Zahlen.',
                  content_type_id: paragraph.id
                }
              ]
            }
          ]
        },
        {
          text: "Nutzer an den PC / Tablet bringen um das Angebot zu besprechen",
          content_type_id: outline.id,
          content_blocks_attributes: [
            {
              text: 'Haben Sie gerade die Möglichkeit an ein PC, Laptop oder Tablet zu gehen? Dann kann ich Ihnen geschwind einmal zeigen was ich Ihnen gerade erklärt habe. ',
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    },
    {
      title: 'Individuelles Angebot vorstellen & Deal Closing:',
      description: '',
      status: 'live',
      order_no: 5,
      icon: "fa-file-signature",
      content_blocks_attributes: [
        # outline
        {
          content_type_id: bullet.id,
          content_blocks_attributes: [
            {
              text: "Aufteilung erklären & Feedback vom Kunden einholen",
              content_type_id: paragraph.id
            },
            {
              text: 'Tarif & Vorteile erklären vs. Herkömmliche Pflegetarife (Starre Tarife)',
              content_type_id: paragraph.id
            },
            {
              text: 'Rolle von Afilio erklären (Unabhängige Experten für Afilio Nutzer)',
              content_type_id: paragraph.id
            },
            {
              text: 'Feedback vom Kunden einholen',
              content_type_id: paragraph.id
            },
            {
              text: 'Call to Action: Bsp. lassen Sie uns doch einen Haken hinter das Thema setzen',
              content_type_id: paragraph.id
            }
          ]
        }
      ]
    }
  ]
)
