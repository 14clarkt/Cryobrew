# Notes to self

## To view the development version of this code

1. Create 2 terminals
2. Cd one to /api and run: dotnet watch
3. Cd the other to /client-app and run: npm start

## To deploy changes

1. In terminal, cd to /client-app and run: npm run build
2. Commit the changes that this creates (along with whatever other outstanding changes)
3. Merge the changes into branch: main
4. Wait for the Github Actions to complete, they will automatically deploy the changes

## To view the deployed database from VSCode

1. In terminal, run: fly proxy 6543:5432 -a cryobrew-db
2. DB is now viewable in the PostgreSQL Explorer tab under flyio

## To update the database

1. In terminal at base directory:
2. dotnet ef migrations add {Descriptive Name} -s API -p Persistence
3. dotnet ef database update -s API -p Persistence