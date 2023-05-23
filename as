[1mdiff --git a/backend/controller/dataModule.js b/backend/controller/dataModule.js[m
[1mindex e8ae3f6..cd18c52 100644[m
[1m--- a/backend/controller/dataModule.js[m
[1m+++ b/backend/controller/dataModule.js[m
[36m@@ -56,7 +56,6 @@[m [mmodule.exports = {[m
           response[0].tirada[0] = result [m
         }[m
       }[m
[31m-[m
       resolve(response)[m
       [m
     }).catch(err => reject(err)))[m
[36m@@ -159,7 +158,6 @@[m [mmodule.exports = {[m
           start: { $lte: criticalRoll },[m
           end: { $gte: criticalRoll },[m
         }).then(response => {[m
[31m-[m
             resolve(response)[m
 [m
         }).catch(err => reject(err));[m
[1mdiff --git a/backend/controller/readController.js b/backend/controller/readController.js[m
[1mindex e662d47..9d6742a 100644[m
[1m--- a/backend/controller/readController.js[m
[1m+++ b/backend/controller/readController.js[m
[36m@@ -3,7 +3,19 @@[m [mconst Criticos_secundarios = require('../database/models/Criticos_secundarios')[m
 const Distance_bonus = require('../database/models/Distance_bonus')[m
 const dataModule = require('../controller/dataModule') [m
 [m
[32m+[m[32mconst destructure = (attack) => {[m
[32m+[m[32m  const result = [];[m
[32m+[m[32m  for (var i = attack?.length - 1; i >= 0; i--) {[m
[32m+[m[32m    result.push(attack[i]);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  const attackValues = {[m
[32m+[m[32m    severity: result[1],[m
[32m+[m[32m    critical: result[0],[m
[32m+[m[32m  };[m
 [m
[32m+[m[32m  return attackValues[m
[32m+[m[32m}[m
 [m
 module.exports = {[m
 [m
[36m@@ -41,7 +53,8 @@[m [mmodule.exports = {[m
 [m
         const response = await dataModule.attack(weaponKey, armour, tiradaSM, criatura)[m
         if(response && response[0]?.tirada?.length > 0){[m
[31m-          return res.json({result: response[0].tirada[0] == 'F*' ? 'Pifiaste' : response[0].tirada[0], data:{arma: response[0].arma, tipo: response[0].tipo}})[m
[32m+[m[32m          const destructureCritical = destructure(response[0].tirada[0])[m
[32m+[m[32m          return res.json({result: response[0].tirada[0] == 'F*' ? 'Pifiaste' : response[0].tirada[0], data:{arma: response[0].arma, tipo: response[0].tipo, destructured: destructureCritical}})[m
         }[m
         return res.json({result: 'No se encontraron resultados'})[m
        }[m
[36m@@ -85,21 +98,6 @@[m [mmodule.exports = {[m
 [m
   getMagicals: async (req, res) => {[m
 [m
[31m-[m
[31m-    const destructure = (attack) => {[m
[31m-      const result = [];[m
[31m-      for (var i = attack?.length - 1; i >= 0; i--) {[m
[31m-        result.push(attack[i]);[m
[31m-      }[m
[31m-[m
[31m-      const attackValues = {[m
[31m-        severity: result[1],[m
[31m-        critical: result[0],[m
[31m-      };[m
[31m-[m
[31m-      return attackValues[m
[31m-    }[m
[31m-[m
     if (Object.entries(req.body).length != 0) {[m
       const weapon = req?.body?.weapon;[m
       const attack = req?.body?.attack;[m
[1mdiff --git a/frontend/src/components/Critical.js b/frontend/src/components/Critical.js[m
[1mindex eec2b08..e88e24b 100644[m
[1m--- a/frontend/src/components/Critical.js[m
[1m+++ b/frontend/src/components/Critical.js[m
[36m@@ -4,7 +4,13 @@[m
   import styles from '../styles/home.module.css'[m
 [m
   const apiUrl = process.env.NEXT_PUBLIC_API_URL[m
[31m-  [m
[32m+[m[32m  const specialCriticals = {[m
[32m+[m[32m    E: {name:'Electricidad'},[m
[32m+[m[32m    I: {name: 'Impacto'},[m
[32m+[m[41m    [m
[32m+[m[41m    [m
[32m+[m[32m  }[m
[32m+[m
 [m
 const Critical = (props) => {[m
 [m
[36m@@ -52,6 +58,7 @@[m [mconst Critical = (props) => {[m
     const { name, value } = e.target;[m
     setCriticalData({ ...criticalData, [name]: value});[m
   }[m
[32m+[m
   [m
   return ([m
     <div className={styles.container_description}>[m
