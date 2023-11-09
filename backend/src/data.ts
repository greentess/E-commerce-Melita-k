export const sample_users: any[] = [
 {
   name: "John Doe",
   email: "john@gmail.com",
   password: "12345",
   isAdmin: true,
 },
 {
   name: "Jane Doe",
   email: "Jane@gmail.com",
   password: "12345",
   isAdmin: false,
 },
];

export const sample_tags:any[]=[
  {name:"Боевое холодное оружие",count:6},
  {name:"Туристические (гражданские)",count:11},
  {name:"Хозяйственно-бытовые",count:1}
]

export const sample_items: any[]=[
  {
    id:'1',
    name: '111',
    price: 2900,
    description:'sss',
    imageUrl: '1',
    coverage:['Антиблик','Камуфляж'],
    handle:['Резина','Кожа'],
    tech: [['Длина клинка','5см'],['Толщина обуха','1см']],
    tags: ['Туристические (гражданские)']
  },
  {
   id:'2',
   name: '111',
   price: 2900,
   description:'sss',
   imageUrl: '1',
   coverage:['Антиблик','Камуфляж'],
   handle:['Резина','Кожа'],
   tech: [['Длина клинка','10см'],['Толщина обуха','12см']],
   tags: ['Туристические (гражданские)']
 },
]
