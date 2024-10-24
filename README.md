# Assignment I (3-tier rule engine)

## Run locally

```bash
npm install
npm start -- [RULE] [DATA]

```

- RULE :

  - 3-tier rule
  - ex: '((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)'

- DATA :
  - Optional
  - JSON dataset for the rule
  - ex: '{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'

> NOTE: When passing RULE and DATA as CLI arguments it should in enclosed in '' or "".

```bash
# Invalid
npm start -- 1 = 1

# Valid
npm start -- '1 = 1'
```

## TODOS

- [ ] Store rule to database
- [ ] Refactor combineRules function
