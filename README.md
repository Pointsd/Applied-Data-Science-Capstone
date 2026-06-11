# Applied Data Science Capstone — SpaceX Falcon 9 Landing Prediction

IBM Data Science Professional Certificate — final capstone project.

**Goal:** predict whether the Falcon 9 first stage will land successfully, so launch
cost can be estimated (a reused first stage costs ~$62M vs ~$165M for competitors).

## Project stages
1. **Data Collection** — SpaceX REST API + Wikipedia web scraping (BeautifulSoup)
2. **Data Wrangling** — cleaning, one-hot encoding, building the binary landing label
3. **EDA** — SQL queries + visual exploration (matplotlib / seaborn)
4. **Interactive Analytics** — Folium maps + Plotly Dash dashboard
5. **Predictive Analysis** — Logistic Regression, SVM, Decision Tree, KNN with GridSearchCV

## Key results
- Overall landing success rate ≈ 67% (60 successes / 30 failures over 90 launches)
- Success improves with flight experience and varies by orbit and launch site
- All four tuned classifiers reach ~83% accuracy on the test set

## Contents
- `dataset_part_2.csv` — cleaned launch dataset with the landing `Class` label
- `images/` — EDA, Folium and predictive-analysis charts used in the presentation
- `notebooks/` — capstone notebooks
- `SpaceX_Capstone_Presentation.pdf` — final findings presentation
