<p align="center">
    <img src="https://cdn.discordapp.com/attachments/753743737901023242/1075359964517896192/github-header-image1.png" alt="Banner" />
    <a href="https://discord.gg/un87saPuCT"><img src="https://img.shields.io/badge/Discord-5764F4?&style=flat-square&logo=Discord&logoColor=white" alt="Discord" /></a>
    <a href="https://ko-fi.com/vakea"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FF5E5B?&style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>
    <a href="mailto:farfy.dev@gmail.com"><img src="https://img.shields.io/badge/Email-181717.svg?style=flat-square&logo=GMail&logoColor=white" alt="Mail" /></a>
    <a href="https://www.riniya.uk"><img src="https://img.shields.io/badge/Website-181717?&style=flat-square&logo=Slashdot&logoColor=white" alt="Website" /></a>
</p>

<p align="center">
    <a href="https://docs.riniya.uk"><img src="https://img.shields.io/badge/Documentations-9766F5?&style=flat-square&logo=Json&logoColor=white" alt="Documentations" /></a>
    <a href="https://api.riniya.uk"><img src="https://img.shields.io/badge/API-9766F5?&style=flat-square&logo=smart&logoColor=white" alt="API" /></a>
    <a href="https://endpoint.riniya.uk"><img src="https://img.shields.io/badge/Endpoint-9766F5?&style=flat-square&logo=smart&logoColor=white" alt="Mail" /></a>
    <a href="https://status.riniya.uk"><img src="https://img.shields.io/badge/Status-9766F5?&style=flat-square&logo=skynet&logoColor=white" alt="Website" /></a>
</p>

This repo is still in work.

#### How do I use it?
It's very simple. All you need is git, a MongoDB server and Redis.

```
git clone git@github.com/RINIYAProject/gitium.riniya.uk.git
cd gitium.riniya.uk/
yarn && yarn run start
```

#### The .env is necessary to run the bot.
#### Required variables
```env
# Database and pub/sub.
MONGODB_URL=mongodb://
REDIS_URL=redis://

# Security
# Recommended to use specific domains.
CORS_ALLOWED_ORIGINS="*" 
CORS_ALLOWED_METHODS="GET,POST,PUT,PATCH,DELETE"

# Debugging and options
PORT=3500
DEBUG=true
ENVIRONEMENT=develop

# JWT Configurations
JWT_SECRET_KEY=

# Versioning
VERSION=1.0.1
REVISION=

# BCrypt and cookie safety
BCRYPT_SALT_ROUND=8
COOKIE_SESSION_SECRET=<super_secret_key>
```

#### Progression
- [X] Routes and controllers
- [X] Database models
- [X] Middlewares
- [X] Git server
- [X] Controllers implementation
- [X] MFA Authentication checks

#### Advices
For the web apps you should use HAProxy to dispatch the network correctly.
You should also use a separated server for the database, just for security reasons.

#### Disclaimers
This project is under the GNU-GPLv3 license. You must follow the license and guidelines to use this project. 
No commercial usage is allowed, You must upload your source publically under the same license and author. if you are using this project. 
You cannot remove the Author header / Contributor name inside the code.
You cannot add you in the author list. You are only allowed to be in the contributor list if you did a pull request on the official repository.

### Visitors:
<img src="https://visitor-badge.laobi.icu/badge?page_id=RINIYAProject&left_color=black&right_color=black&left_text=Visitors" alt="visitors"/>
