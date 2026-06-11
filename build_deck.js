const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

const IMG = "/Users/sokhib/capstone_spacex/images/";
const GH = "https://github.com/Pointsd/Applied-Data-Science-Capstone";

// palette — space / SpaceX
const NAVY = "0B1437", DEEP = "13204A", INK = "1A2540";
const WHITE = "FFFFFF", CLOUD = "F4F6FB", MUTE = "8A93A8", LINE = "E2E6F0";
const ACCENT = "FF5A3C", BLUE = "3D7BFF";
const HFONT = "Georgia", BFONT = "Calibri";

function dark(slide){ slide.background = { color: NAVY }; }
function light(slide){ slide.background = { color: WHITE }; }

// ---------- helpers ----------
function gh(slide, x, y, w){
  slide.addText("GitHub: " + GH, { x, y, w: w||9, h:0.3, fontFace: BFONT, fontSize:9, color: BLUE, italic:true });
}
function title(slide, t){
  slide.addText(t, { x:0.6, y:0.45, w:12.1, h:0.9, fontFace:HFONT, fontSize:32, bold:true, color: NAVY });
}

// ===== 1. TITLE =====
let s = p.addSlide(); dark(s);
s.addText("Applied Data Science Capstone", { x:0.8, y:2.1, w:11.7, h:1.1, fontFace:HFONT, fontSize:46, bold:true, color:WHITE });
s.addText("Predicting the Successful Landing of the Falcon 9 First Stage", { x:0.8, y:3.25, w:11.7, h:0.7, fontFace:BFONT, fontSize:22, color:"CADCFC" });
s.addText("SpaceX Launch Records  ·  Machine Learning  ·  Interactive Analytics", { x:0.8, y:4.05, w:11.7, h:0.5, fontFace:BFONT, fontSize:14, color:MUTE });
s.addShape(p.ShapeType.rect, { x:0.8, y:5.4, w:2.6, h:0.06, fill:{color:ACCENT} });
s.addText("IBM Data Science Professional Certificate", { x:0.8, y:5.6, w:11.7, h:0.4, fontFace:BFONT, fontSize:13, color:"CADCFC" });
s.addText("Author: Pointsd  ·  2026", { x:0.8, y:6.0, w:11.7, h:0.4, fontFace:BFONT, fontSize:13, color:MUTE });

// ===== 2. EXECUTIVE SUMMARY (1.3) =====
s = p.addSlide(); light(s); title(s, "Executive Summary");
const exRows = [
  ["Methodologies", "Data collection via SpaceX REST API and Wikipedia web scraping; data wrangling; EDA with SQL and visualization; interactive maps (Folium) and dashboard (Plotly Dash); predictive classification models."],
  ["Key Results", "Overall landing success rate of ~67%. Success improves with flight experience and varies strongly by orbit and launch site. Four classifiers reached ~83% test accuracy in predicting first-stage landing."],
];
let yy = 1.7;
exRows.forEach(([h,b])=>{
  s.addShape(p.ShapeType.ellipse, { x:0.6, y:yy+0.05, w:0.22, h:0.22, fill:{color:ACCENT} });
  s.addText(h, { x:1.0, y:yy, w:11.3, h:0.4, fontFace:BFONT, fontSize:18, bold:true, color:NAVY });
  s.addText(b, { x:1.0, y:yy+0.45, w:11.5, h:1.4, fontFace:BFONT, fontSize:15, color:INK, lineSpacingMultiple:1.1 });
  yy += 2.3;
});
s.addText("Goal: determine if the Falcon 9 first stage will land, enabling launch-cost estimation (a reused stage costs ~$62M vs ~$165M).",
  { x:0.6, y:6.4, w:12.1, h:0.6, fontFace:BFONT, fontSize:13, italic:true, color:MUTE });

// ===== 3. INTRODUCTION (1.4) =====
s = p.addSlide(); light(s); title(s, "Introduction");
s.addText("Background", { x:0.6, y:1.6, w:6, h:0.4, fontFace:BFONT, fontSize:18, bold:true, color:ACCENT });
s.addText([
  {text:"SpaceX advertises Falcon 9 launches at $62M; other providers cost up to $165M.", options:{bullet:true}},
  {text:"Much of the saving comes from reusing the first stage.", options:{bullet:true}},
  {text:"If we can predict whether the first stage lands, we can estimate launch cost.", options:{bullet:true}},
  {text:"This is valuable for any company competing to bid against SpaceX.", options:{bullet:true}},
], { x:0.7, y:2.05, w:6.2, h:2.6, fontFace:BFONT, fontSize:15, color:INK, lineSpacingMultiple:1.15 });
s.addText("Questions to answer", { x:7.2, y:1.6, w:5.5, h:0.4, fontFace:BFONT, fontSize:18, bold:true, color:ACCENT });
s.addText([
  {text:"What factors determine a successful landing?", options:{bullet:true}},
  {text:"How do payload, orbit and launch site affect success?", options:{bullet:true}},
  {text:"How has success rate changed over the years?", options:{bullet:true}},
  {text:"Which classification model best predicts landing?", options:{bullet:true}},
], { x:7.3, y:2.05, w:5.4, h:2.6, fontFace:BFONT, fontSize:15, color:INK, lineSpacingMultiple:1.15 });

// ===== 4. METHODOLOGY OVERVIEW =====
s = p.addSlide(); dark(s);
s.addText("Methodology", { x:0.6, y:0.5, w:12, h:0.9, fontFace:HFONT, fontSize:32, bold:true, color:WHITE });
const steps = [
  ["1","Data Collection","SpaceX REST API + Wikipedia web scraping"],
  ["2","Data Wrangling","Cleaning, one-hot encoding, landing label"],
  ["3","EDA","SQL queries + visual exploration"],
  ["4","Interactive Viz","Folium maps + Plotly Dash dashboard"],
  ["5","Predictive Analysis","LogReg, SVM, Decision Tree, KNN + GridSearch"],
];
let xx = 0.6;
steps.forEach(([n,h,b])=>{
  s.addShape(p.ShapeType.roundRect, { x:xx, y:2.2, w:2.35, h:3.0, fill:{color:DEEP}, line:{color:ACCENT,width:1} });
  s.addText(n, { x:xx, y:2.45, w:2.35, h:0.8, align:"center", fontFace:HFONT, fontSize:40, bold:true, color:ACCENT });
  s.addText(h, { x:xx+0.1, y:3.35, w:2.15, h:0.8, align:"center", fontFace:BFONT, fontSize:15, bold:true, color:WHITE });
  s.addText(b, { x:xx+0.12, y:4.15, w:2.1, h:1.0, align:"center", fontFace:BFONT, fontSize:11.5, color:"CADCFC" });
  xx += 2.5;
});

// ===== 5. DATA COLLECTION - API (1.5) =====
s = p.addSlide(); light(s); title(s, "Data Collection — SpaceX API");
s.addText([
  {text:"1.  GET request to the SpaceX REST API (/launches/past)", options:{bullet:true}},
  {text:"2.  Decode JSON response into a DataFrame with pd.json_normalize()", options:{bullet:true}},
  {text:"3.  Query helper endpoints (rocket, payload, launchpad, cores) to enrich rows", options:{bullet:true}},
  {text:"4.  Filter to Falcon 9 launches; replace missing PayloadMass with the mean", options:{bullet:true}},
  {text:"5.  Export the cleaned dataset to CSV", options:{bullet:true}},
], { x:0.7, y:1.8, w:8.0, h:3.2, fontFace:BFONT, fontSize:15.5, color:INK, lineSpacingMultiple:1.3 });
s.addShape(p.ShapeType.roundRect, { x:9.0, y:1.9, w:3.6, h:3.0, fill:{color:CLOUD}, line:{color:LINE,width:1} });
s.addText("API → JSON\n↓ json_normalize\nDataFrame\n↓ enrich + clean\n90 Falcon 9 launches",
  { x:9.0, y:1.9, w:3.6, h:3.0, align:"center", fontFace:"Consolas", fontSize:14, color:NAVY, lineSpacingMultiple:1.4 });
gh(s, 0.7, 6.7);

// ===== 6. DATA COLLECTION - SCRAPING (1.6) =====
s = p.addSlide(); light(s); title(s, "Data Collection — Web Scraping");
s.addText([
  {text:"1.  HTTP GET on the Wikipedia 'List of Falcon 9 and Falcon Heavy launches' page", options:{bullet:true}},
  {text:"2.  Parse the HTML with BeautifulSoup", options:{bullet:true}},
  {text:"3.  Locate the launch records table (wikitable)", options:{bullet:true}},
  {text:"4.  Extract column headers, then iterate rows to collect each launch record", options:{bullet:true}},
  {text:"5.  Build a DataFrame and export to CSV", options:{bullet:true}},
], { x:0.7, y:1.8, w:8.0, h:3.2, fontFace:BFONT, fontSize:15.5, color:INK, lineSpacingMultiple:1.3 });
s.addShape(p.ShapeType.roundRect, { x:9.0, y:1.9, w:3.6, h:3.0, fill:{color:CLOUD}, line:{color:LINE,width:1} });
s.addText("Wiki page\n↓ requests.get\nHTML\n↓ BeautifulSoup\n↓ find table + rows\nDataFrame",
  { x:9.0, y:1.9, w:3.6, h:3.0, align:"center", fontFace:"Consolas", fontSize:14, color:NAVY, lineSpacingMultiple:1.35 });
gh(s, 0.7, 6.7);

// ===== 7. DATA WRANGLING (1.7) =====
s = p.addSlide(); light(s); title(s, "Data Wrangling");
s.addText([
  {text:"Computed launches per site, per orbit, and per landing outcome with value_counts().", options:{bullet:true}},
  {text:"Landing outcomes (True ASDS, True RTLS, True Ocean ...) were mapped to a binary label.", options:{bullet:true}},
  {text:"Class = 1 for a successful landing, Class = 0 for an unsuccessful one.", options:{bullet:true}},
  {text:"Resulting training label has 60 successes and 30 failures (mean success ≈ 0.667).", options:{bullet:true}},
], { x:0.7, y:1.8, w:11.8, h:2.6, fontFace:BFONT, fontSize:16, color:INK, lineSpacingMultiple:1.3 });
s.addShape(p.ShapeType.roundRect, { x:0.7, y:4.7, w:5.7, h:1.4, fill:{color:NAVY} });
s.addText("60", { x:0.7, y:4.8, w:1.6, h:1.1, align:"center", fontFace:HFONT, fontSize:48, bold:true, color:ACCENT });
s.addText("successful\nlandings (Class = 1)", { x:2.3, y:4.95, w:4.0, h:0.9, fontFace:BFONT, fontSize:15, color:WHITE });
s.addShape(p.ShapeType.roundRect, { x:6.8, y:4.7, w:5.7, h:1.4, fill:{color:INK} });
s.addText("30", { x:6.8, y:4.8, w:1.6, h:1.1, align:"center", fontFace:HFONT, fontSize:48, bold:true, color:BLUE });
s.addText("failed\nlandings (Class = 0)", { x:8.4, y:4.95, w:4.0, h:0.9, fontFace:BFONT, fontSize:15, color:WHITE });
gh(s, 0.7, 6.7);

// ===== 8. EDA WITH VISUALIZATION (1.8) =====
s = p.addSlide(); light(s); title(s, "EDA with Data Visualization — Approach");
s.addText([
  {text:"Scatter plots: Flight Number vs Launch Site / Orbit, and Payload vs Launch Site / Orbit, to reveal how experience and payload relate to success.", options:{bullet:true}},
  {text:"Bar chart: success rate per orbit type, to compare orbits directly.", options:{bullet:true}},
  {text:"Line chart: yearly average success rate, to expose the long-term trend.", options:{bullet:true}},
], { x:0.7, y:1.9, w:11.8, h:3.4, fontFace:BFONT, fontSize:16.5, color:INK, lineSpacingMultiple:1.4 });
gh(s, 0.7, 6.7);

// ===== 9. EDA WITH SQL (1.9) =====
s = p.addSlide(); light(s); title(s, "EDA with SQL — Queries Performed");
s.addText([
  {text:"Unique launch sites and launches beginning with 'CCA'.", options:{bullet:true}},
  {text:"Total and average payload mass (e.g. by booster version F9 v1.1).", options:{bullet:true}},
  {text:"First successful ground-pad landing date; boosters with success on drone ship in a payload range.", options:{bullet:true}},
  {text:"Counts of mission outcomes; boosters that carried the maximum payload.", options:{bullet:true}},
  {text:"2015 failed landing records and a ranked count of outcomes between 2010-06 and 2017-03.", options:{bullet:true}},
], { x:0.7, y:1.8, w:11.8, h:3.6, fontFace:BFONT, fontSize:15.5, color:INK, lineSpacingMultiple:1.3 });
gh(s, 0.7, 6.7);

// ===== 10. INTERACTIVE ANALYTICS OVERVIEW (1.10) =====
s = p.addSlide(); dark(s);
s.addText("Interactive Visual Analytics", { x:0.6, y:0.5, w:12, h:0.9, fontFace:HFONT, fontSize:32, bold:true, color:WHITE });
s.addShape(p.ShapeType.roundRect, { x:0.7, y:2.0, w:5.9, h:3.3, fill:{color:DEEP}, line:{color:ACCENT,width:1} });
s.addText("Folium Maps", { x:0.9, y:2.2, w:5.5, h:0.5, fontFace:BFONT, fontSize:20, bold:true, color:ACCENT });
s.addText([
  {text:"Marked all launch sites on an interactive map.", options:{bullet:true}},
  {text:"Colored markers/clusters by success vs failure.", options:{bullet:true}},
  {text:"Measured proximity to coast, railways and cities.", options:{bullet:true}},
], { x:0.95, y:2.85, w:5.4, h:2.2, fontFace:BFONT, fontSize:14.5, color:"CADCFC", lineSpacingMultiple:1.25 });
s.addShape(p.ShapeType.roundRect, { x:6.8, y:2.0, w:5.9, h:3.3, fill:{color:DEEP}, line:{color:BLUE,width:1} });
s.addText("Plotly Dash Dashboard", { x:7.0, y:2.2, w:5.5, h:0.5, fontFace:BFONT, fontSize:20, bold:true, color:BLUE });
s.addText([
  {text:"Dropdown to select launch site.", options:{bullet:true}},
  {text:"Pie chart of successful launches.", options:{bullet:true}},
  {text:"Payload-range slider + payload-vs-outcome scatter.", options:{bullet:true}},
], { x:7.05, y:2.85, w:5.4, h:2.2, fontFace:BFONT, fontSize:14.5, color:"CADCFC", lineSpacingMultiple:1.25 });
s.addText("GitHub: " + GH, { x:0.7, y:6.7, w:12, h:0.3, fontFace:BFONT, fontSize:9, color:"7FA0FF", italic:true });

// ===== 11-13. EDA VISUALIZATION RESULTS (1.11) =====
function imgSlide(t, img, caption){
  let s = p.addSlide(); light(s); title(s, t);
  s.addImage({ path: IMG+img, x:0.9, y:1.6, w:8.4, h:4.7, sizing:{type:"contain", w:8.4, h:4.7} });
  s.addShape(p.ShapeType.roundRect, { x:9.6, y:2.2, w:3.1, h:3.4, fill:{color:CLOUD}, line:{color:LINE,width:1} });
  s.addText(caption, { x:9.8, y:2.4, w:2.75, h:3.0, fontFace:BFONT, fontSize:13.5, color:INK, lineSpacingMultiple:1.25 });
  gh(s, 0.9, 6.75);
  return s;
}
imgSlide("EDA Results — Flight Number vs Launch Site", "eda_flight_vs_site.png",
  "Later flights (higher experience) show more successes. CCAFS SLC 40 carries the most launches across all phases.");
imgSlide("EDA Results — Payload vs Launch Site", "eda_payload_vs_site.png",
  "Heavier payloads are associated with more successful landings, especially at KSC LC 39A.");
imgSlide("EDA Results — Success Rate by Orbit", "eda_success_by_orbit.png",
  "Orbits such as ES-L1, GEO, HEO and SSO show the highest landing success; GTO is among the weakest.");
imgSlide("EDA Results — Flight Number vs Orbit", "eda_flight_vs_orbit.png",
  "In LEO, success is linked to flight number; in GTO there is no clear relationship.");
imgSlide("EDA Results — Yearly Success Trend", "eda_yearly_trend.png",
  "Success rate climbs steadily from 2013 onward as SpaceX accumulates landing experience.");

// ===== 16. EDA SQL RESULTS (1.12) =====
s = p.addSlide(); light(s); title(s, "EDA with SQL — Key Findings");
const sqlCards = [
  ["4 launch sites","CCAFS LC-40, KSC LC-39A, VAFB SLC-4E, CCAFS SLC-40"],
  ["619,968 kg","total payload carried by NASA (CRS) boosters"],
  ["2015-12-22","first successful ground-pad (RTLS) landing"],
  ["F9 B5 B1048+","boosters carrying the maximum payload (15,600 kg)"],
];
let cx=0.7, cy=1.8;
sqlCards.forEach((c,i)=>{
  const x = 0.7 + (i%2)*6.05, y = 1.8 + Math.floor(i/2)*2.35;
  s.addShape(p.ShapeType.roundRect, { x, y, w:5.8, h:2.05, fill:{color:NAVY} });
  s.addText(c[0], { x:x+0.25, y:y+0.2, w:5.3, h:0.7, fontFace:HFONT, fontSize:26, bold:true, color:ACCENT });
  s.addText(c[1], { x:x+0.25, y:y+1.0, w:5.3, h:0.9, fontFace:BFONT, fontSize:14, color:WHITE, lineSpacingMultiple:1.15 });
});
gh(s, 0.7, 6.75);

// ===== 17. FOLIUM MAP RESULTS (1.13) =====
s = p.addSlide(); light(s); title(s, "Interactive Map — Folium");
s.addImage({ path: IMG+"folium_launch_sites.png", x:0.7, y:1.6, w:8.6, h:4.8, sizing:{type:"contain", w:8.6, h:4.8} });
s.addShape(p.ShapeType.roundRect, { x:9.5, y:2.2, w:3.2, h:3.5, fill:{color:CLOUD}, line:{color:LINE,width:1} });
s.addText([
  {text:"All launch sites sit near the coast and the equator.", options:{bullet:true}},
  {text:"Marker color = success rate, size = number of launches.", options:{bullet:true}},
  {text:"Sites are close to railways and highways but away from cities.", options:{bullet:true}},
], { x:9.7, y:2.4, w:2.85, h:3.1, fontFace:BFONT, fontSize:13.5, color:INK, lineSpacingMultiple:1.25 });
gh(s, 0.7, 6.8);

// ===== 18. DASHBOARD RESULTS (1.14) =====
s = p.addSlide(); light(s); title(s, "Plotly Dash — Dashboard Results");
s.addImage({ path: IMG+"dash_success_pie.png", x:0.7, y:1.7, w:5.7, h:4.4, sizing:{type:"contain", w:5.7, h:4.4} });
s.addImage({ path: IMG+"dash_payload_scatter.png", x:6.7, y:1.7, w:6.0, h:4.4, sizing:{type:"contain", w:6.0, h:4.4} });
s.addText("Success share by site (left) and payload vs outcome by booster version (right).",
  { x:0.7, y:6.25, w:12, h:0.35, fontFace:BFONT, fontSize:13, italic:true, color:MUTE });
gh(s, 0.7, 6.8);

// ===== 19. PREDICTIVE - APPROACH =====
s = p.addSlide(); light(s); title(s, "Predictive Analysis — Methodology");
s.addText([
  {text:"Standardized the feature matrix and split into train / test (80 / 20, 18 test rows).", options:{bullet:true}},
  {text:"Trained Logistic Regression, SVM, Decision Tree and KNN.", options:{bullet:true}},
  {text:"Tuned hyperparameters with GridSearchCV (10-fold cross-validation).", options:{bullet:true}},
  {text:"Selected the best model by accuracy and inspected the confusion matrix.", options:{bullet:true}},
], { x:0.7, y:1.9, w:11.8, h:3.2, fontFace:BFONT, fontSize:16.5, color:INK, lineSpacingMultiple:1.4 });
gh(s, 0.7, 6.75);

// ===== 20. PREDICTIVE - MODEL COMPARISON (1.15) =====
s = p.addSlide(); light(s); title(s, "Predictive Analysis — Model Comparison");
s.addImage({ path: IMG+"ml_model_comparison.png", x:0.7, y:1.7, w:7.4, h:4.5, sizing:{type:"contain", w:7.4, h:4.5} });
s.addShape(p.ShapeType.roundRect, { x:8.4, y:2.3, w:4.3, h:3.2, fill:{color:NAVY} });
s.addText("83.3%", { x:8.4, y:2.55, w:4.3, h:0.9, align:"center", fontFace:HFONT, fontSize:46, bold:true, color:ACCENT });
s.addText("test accuracy", { x:8.4, y:3.45, w:4.3, h:0.4, align:"center", fontFace:BFONT, fontSize:15, color:"CADCFC" });
s.addText("All four models reach the same accuracy on the small test set; Decision Tree had the best validation score.",
  { x:8.7, y:3.95, w:3.7, h:1.4, align:"center", fontFace:BFONT, fontSize:13.5, color:WHITE, lineSpacingMultiple:1.2 });
gh(s, 0.7, 6.8);

// ===== 21. PREDICTIVE - CONFUSION MATRIX (1.15) =====
s = p.addSlide(); light(s); title(s, "Predictive Analysis — Confusion Matrix");
s.addImage({ path: IMG+"ml_confusion_matrix.png", x:0.9, y:1.7, w:6.4, h:4.6, sizing:{type:"contain", w:6.4, h:4.6} });
s.addShape(p.ShapeType.roundRect, { x:7.7, y:2.2, w:5.0, h:3.6, fill:{color:CLOUD}, line:{color:LINE,width:1} });
s.addText([
  {text:"The model correctly identifies most successful landings.", options:{bullet:true}},
  {text:"The main weakness is false positives — predicting a landing that did not occur.", options:{bullet:true}},
  {text:"More data would help separate the classes further.", options:{bullet:true}},
], { x:7.9, y:2.4, w:4.6, h:3.2, fontFace:BFONT, fontSize:15, color:INK, lineSpacingMultiple:1.3 });
gh(s, 0.9, 6.8);

// ===== 22. CONCLUSION =====
s = p.addSlide(); dark(s);
s.addText("Conclusions", { x:0.6, y:0.5, w:12, h:0.9, fontFace:HFONT, fontSize:32, bold:true, color:WHITE });
s.addText([
  {text:"Landing success has risen markedly since 2013 as SpaceX gained experience.", options:{bullet:true, color:"CADCFC"}},
  {text:"Flight number, payload mass, orbit type and launch site are all predictive of success.", options:{bullet:true, color:"CADCFC"}},
  {text:"Low-weight orbits and certain sites (KSC LC 39A) show the highest success rates.", options:{bullet:true, color:"CADCFC"}},
  {text:"All four tuned classifiers predict landings with ~83% test accuracy.", options:{bullet:true, color:"CADCFC"}},
  {text:"Future work: enrich with weather and booster-reuse history, and gather more launches to reduce false positives.", options:{bullet:true, color:"CADCFC"}},
], { x:0.8, y:2.0, w:11.7, h:3.6, fontFace:BFONT, fontSize:17, lineSpacingMultiple:1.45 });
s.addShape(p.ShapeType.rect, { x:0.8, y:6.0, w:2.6, h:0.06, fill:{color:ACCENT} });
s.addText("Innovation: a deployable bid-estimation tool that turns landing probability into a launch-cost forecast.",
  { x:0.8, y:6.2, w:11.7, h:0.6, fontFace:BFONT, fontSize:13, italic:true, color:"9FB0D8" });

// ===== 23. APPENDIX / THANK YOU =====
s = p.addSlide(); dark(s);
s.addText("Appendix & Resources", { x:0.8, y:2.2, w:11.7, h:0.9, fontFace:HFONT, fontSize:34, bold:true, color:WHITE });
s.addText([
  {text:"All notebooks (data collection, wrangling, EDA SQL, EDA viz, Folium, Dash, ML):", options:{bullet:false, breakLine:true}},
  {text:GH, options:{bullet:false, color:"7FA0FF", breakLine:true}},
  {text:"", options:{breakLine:true}},
  {text:"Dataset: SpaceX REST API + Wikipedia launch records (90 Falcon 9 launches).", options:{bullet:false, color:"CADCFC", breakLine:true}},
], { x:0.8, y:3.4, w:11.7, h:2.0, fontFace:BFONT, fontSize:16, color:WHITE, lineSpacingMultiple:1.4 });
s.addText("Thank you!", { x:0.8, y:5.7, w:11.7, h:0.7, fontFace:HFONT, fontSize:24, bold:true, color:ACCENT });

p.writeFile({ fileName: "/Users/sokhib/capstone_spacex/SpaceX_Capstone_Presentation.pptx" })
 .then(f => console.log("WROTE", f));
