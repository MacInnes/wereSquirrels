var db = require('monk')('localhost/weresquirrelduels');

var colonies = db.get('colonies');
var wereSquirrels = db.get('wereSquirrels');
var uniBears = db.get('uniBears');
var wereSquirrelsContract = db.get('wereSquirrelsContract');
var uniBearsContract = db.get('uniBearsContract');
var duels = db.get('duels');
var duelStats = db.get('duelStats');

//colonies:
var frontier = colonies.id(),
    forest = colonies.id(),
    alliance = colonies.id(),
    horde = colonies.id();

//wereSquirrels:
var tiny = wereSquirrels.id(),
    smalls = wereSquirrels.id(),
    scruffy = wereSquirrels.id(),
    fluffy = wereSquirrels.id(),
    uncleAndy = wereSquirrels.id(),
    tacoTimmy = wereSquirrels.id(),
    theZlatan = wereSquirrels.id(),
    suarezDaBiter = wereSquirrels.id();

//unibears:
var pooh = uniBears.id(),
    pooky = uniBears.id(),
    kooky = uniBears.id(),
    spooky = uniBears.id(),
    paddington = uniBears.id(),
    ditka = uniBears.id(),
    smokey = uniBears.id(),
    bearenstAin = uniBears.id();

//contracts:
var wsFrontierContract = wereSquirrelsContract.id(),
    wsForestContract = wereSquirrelsContract.id(),
    wsAllianceContract = wereSquirrelsContract.id(),
    wsHordeContract = wereSquirrelsContract.id(),
    ubFrontierContract = uniBearsContract.id(),
    ubForestContract = uniBearsContract.id();
    ubAllianceContract = uniBearsContract.id();
    ubHordeContract = uniBearsContract.id();

//duels:
var duel1 = duels.id(),
    duel2 = duels.id(),
    duel3 = duels.id(),
    duel4 = duels.id(),
    duel5 = duels.id(),
    duel6 = duels.id();

//stats:
var tinyStats = duelStats.id(),
    smallsStats = duelStats.id(),
    scruffyStats = duelStats.id(),
    fluffyStats = duelStats.id(),
    uncleAndyStats = duelStats.id(),
    tacoTimmyStats = duelStats.id(),
    theZlatanStats = duelStats.id(),
    suarezDaBiterStats = duelStats.id();

Promise.all([
  colonies.remove().then(function(){
    return Promise.all([
      colonies.insert({_id: frontier, name: 'frontier'}),
      colonies.insert({_id: forest, name: 'forest'}),
      colonies.insert({_id: alliance, name: 'alliance'}),
      colonies.insert({_id: horde, name: 'horde'})
      ])
  }),
  wereSquirrelsContract.remove().then(function(){
    return Promise.all([
      wereSquirrelsContract.insert({_id: wsFrontierContract, colony: frontier, length: '10 years', peanuts: 2}),
      wereSquirrelsContract.insert({_id: wsForestContract, colony: forest, length: '10 years', peanuts: 2}),
      wereSquirrelsContract.insert({_id: wsAllianceContract, colony: alliance, length: '10 years', peanuts: 2}),
      wereSquirrelsContract.insert({_id: wsHordeContract, colony: horde, length: '10 years', peanuts: 2})
      ])
  }),
  uniBearsContract.remove().then(function(){
    return Promise.all([
      uniBearsContract.insert({_id: ubFrontierContract, colony: frontier, length: '1 year', honey: '1 jar'}),
      uniBearsContract.insert({_id: ubForestContract, colony: forest, length: '1 year', honey: '1 jar'}),
      uniBearsContract.insert({_id: ubAllianceContract, colony: alliance, length: '1 year', honey: '1 jar'}),
      uniBearsContract.insert({_id: ubHordeContract, colony: horde, length: '1 year', honey: '1 jar'})
      ])
  }),
  wereSquirrels.remove().then(function(){
    return Promise.all([
      wereSquirrels.insert({_id: tiny, name: 'tiny', contract: wsFrontierContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: smalls, name: 'smalls', contract: wsFrontierContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: scruffy, name: 'scruffy', contract: wsForestContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: fluffy, name: 'fluffy', contract: wsForestContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: uncleAndy, name: 'uncleAndy', contract: wsAllianceContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: tacoTimmy, name: 'tacoTimmy', contract: wsAllianceContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: theZlatan, name: 'Zlatan', contract: wsHordeContract, meatRate: 1, garlicRate: 1}),
      wereSquirrels.insert({_id: suarezDaBiter, name: 'suarezDaBiter', contract: wsHordeContract, meatRate: 1, garlicRate: 1})
      ])
  }),
  uniBears.remove().then(function(){
    return Promise.all([
      uniBears.insert({_id: pooh, name: 'pooh', contract: ubFrontierContract}),
      uniBears.insert({_id: pooky, name: 'pooky', contract: ubFrontierContract}),
      uniBears.insert({_id: kooky, name: 'kooky', contract: ubForestContract}),
      uniBears.insert({_id: spooky, name: 'spooky', contract: ubForestContract}),
      uniBears.insert({_id: paddington, name: 'paddington', contract: ubAllianceContract}),
      uniBears.insert({_id: ditka, name: 'theDitkaBear', contract: ubAllianceContract}),
      uniBears.insert({_id: smokey, name: 'smokey', contract: ubHordeContract}),
      uniBears.insert({_id: bearenstAin, name: 'bearenstAin', contract: ubHordeContract})
      ])
  })
  // duels.remove().then(function(){
  //   return Promise.all([
  //     duels.insert({_id: duel1, colony1: frontier, colony2: forest, winner: frontier, loser: forest}),
  //     duels.insert({_id: duel2, colony1: alliance, colony2: horde, winner: alliance, loser: horde}),
  //     duels.insert({_id: duel3, colony1: frontier, colony2: alliance, winner: frontier, loser: alliance}),
  //     duels.insert({_id: duel4, colony1: forest, colony2: horde, winner: forest, loser: horde}),
  //     duels.insert({_id: duel5, colony1: frontier, colony2: horde, winner: frontier, loser: horde}),
  //     duels.insert({_id: duel6, colony1: forest, colony2: alliance, winner: alliance, loser: forest})
  //     ])
  // }),
  // duelStats.remove().then(function(){
  //   return Promise.all([
  //     duelStats.insert({wereSquirrel: tiny, duel: duel1, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: smalls, duel: duel1, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: scruffy, duel: duel1, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: fluffy, duel: duel1, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: uncleAndy, duel: duel2, meat: 3, garlic: 6}),
  //     duelStats.insert({wereSquirrel: tacoTimmy, duel: duel2, meat: 3, garlic: 6}),
  //     duelStats.insert({wereSquirrel: theZlatan, duel: duel2, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: suarezDaBiter, duel: duel2, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: tiny, duel: duel3, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: smalls, duel: duel3, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: uncleAndy, duel: duel3, meat: 3, garlic: 6}),
  //     duelStats.insert({wereSquirrel: tacoTimmy, duel: duel3, meat: 3, garlic: 6}),
  //     duelStats.insert({wereSquirrel: scruffy, duel: duel4, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: fluffy, duel: duel4, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: theZlatan, duel: duel4, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: suarezDaBiter, duel: duel4, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: tiny, duel: duel5, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: smalls, duel: duel5, meat: 5, garlic: 10}),
  //     duelStats.insert({wereSquirrel: theZlatan, duel: duel5, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: suarezDaBiter, duel: duel5, meat: 1, garlic: 2}),
  //     duelStats.insert({wereSquirrel: scruffy, duel: duel6, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: fluffy, duel: duel6, meat: 2, garlic: 4}),
  //     duelStats.insert({wereSquirrel: uncleAndy, duel: duel6, meat: 3, garlic: 6}),
  //     duelStats.insert({wereSquirrel: tacoTimmy, duel: duel6, meat: 3, garlic: 6})
  //     ])
  // })
]).then(function () {
  db.close()
})





