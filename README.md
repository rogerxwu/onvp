# ONVP

To do:
frontend template and layout, upload pic and let chatgpt genearte the layout for me


design the backend api

react-bootstrap
Charts uses google-react-charts https://www.react-google-charts.com/
## Frontend
Frontend uses next.js and MUI https://mui.com/material-ui/integrations/nextjs/?srsltid=AfmBOoqtJrfZMMe19wOzQ4N_L9NXDBF5RiWEUGdVFroE1LbIno1go1DM

## Backend
Backend uses fastapi

## Infras
Frontend Prod
Frontend Dev
Backend Prod
Backend Dev


## Dev locally
In production env, the frontend and backend will be deployed to two seperate clusters, and the communication between them will be IP based. However, if you want to dev and test locally on your laptop, you can run the following cmds
```
cd onvp
docker-compose -f docker-compose.main.yml up --force-recreate
```
