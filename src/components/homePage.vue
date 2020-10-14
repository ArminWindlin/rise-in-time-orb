<template>
    <div class="content-container">
        <!--Wiki Homepage-->
        <div class="homepage">
            <Menu v-if="!$isMobile"></Menu>

            <MobileMenu v-if="$isMobile"></MobileMenu>
            <form action="/">
                <div class="input-field">
                    <input class="search-input" type="text" placeholder="search wikipage..." name="search">
                    <img class="search-icon" src="../assets/Union.svg">
                </div>
            </form>
            <img class="deco1" src="../assets/groups/group-48.svg" v-if="!$isMobile">
            <img class="deco1-mobile" src="../assets/groups/deco1-reverse.svg" v-if="$isMobile">
            <div class="info-block" v-if="!$isMobile">
                <h2 class="info-heading">Info</h2>
                <p class="info-description">
                    Welcome to our Orb, where you can look up several useful types and statistics about the live
                    servers! As you can most likely tell, this page is still work
                    in progress and there is not much content yet.
                    More useful information will gradually be added and of course, we are open for suggestions about
                    what type of content you would like to see here. :)</p>
                <!-- DECO INFO BLOCK -->
                <img alt="deco" class="deco2" src="../assets/groups/vector-35.svg">
                <img alt="deco" class="deco3" src="../assets/groups/vector-37.svg">
            </div>
            <div class="news">
                <NewsBlock></NewsBlock>
            </div>
        </div>
    </div>
</template>

<script>
import NewsBlock from './newsBlock';
import Menu from '../components/menu';
import MobileMenu from '../components/mobileMenu';

export default {
    name: 'HomePage',
    components: {
        Menu, NewsBlock, MobileMenu
    },
    data() {
        return {
            showInput: false
        };
    }
};

</script>

<style>
.news {
    margin-top: -13px;
}

.input-field {
    width: 485px;
    margin: 35px auto 0 auto;
    position: relative;
}

.search-input {
    width: 495px;
    height: 50px;
    border: 1.5px solid #C4C4C4;
    border-radius: 5px;
    text-align: center;
    font-size: 16px;
}

.search-icon {
    height: 28.8px;
    position: absolute;
    top: 14px;
    right: 1px;
}

.header {
    margin-top: 90px;
}

.b {
    font-weight: bold;
}

.menu-group {
    margin: 10px auto 0 auto;
    position: relative;
    width: 91%;
}

.header-group {
    position: relative;
    margin-top: -10px;
}

.content-container {
    background: #f9f5f0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    overflow: scroll;
    padding: 0;
}

.info-block {
    position: relative;
    width: 75.84vw;
    height: auto;
    box-sizing: border-box;
    margin: 51px auto 0 auto;
    text-align: center;
    color: #959595;
    font-size: 18px;
    overflow: visible;
}

.info-heading {
    font-size: 16px;
    margin-bottom: 2px;
}

.info-description {
    line-height: 25px;
    font-size: 16px;
}

.deco1 {
    width: 96.45px;
    height: 14.26px;
    display: block;
    margin: 20px auto -38px auto;
}

.deco2 {
    position: absolute;
    bottom: -10px;
    left: -19px;
    transform: rotateY(180deg);
    height: 17px;
}

.deco3 {
    position: absolute;
    right: -17px;
    bottom: -10px;
    height: 17px;
}

/*CSS Mobile*/
@media screen and (max-width: 900px) {
    .search-input {
        width: 300px;
    }

    .input-field {
        width: 300px;
    }
}

@media screen and (max-width: 400px) {

    .header-group {
        margin: -10px auto 0 auto;
    }

    .search-input {
        display: block;
        width: 281px;
        height: 38px;
        font-size: 17px;
    }

    .input-field {
        width: 281px;;
    }

    .search-icon {
        right: 5px;
        width: 23px;
        height: 23px;
    }

    #logo {
        margin: 0;
        top: -85px;
        left: -45px;
    }

    .logo-text {
        font-size: 15px;
    }

    .deco1-mobile {
        display: block;
        margin: 10px auto 0 auto;
        width: 123.51px;
        height: 18.26px;
    }

    .article-image {
        width: 281px;
        height: 169px;
        border: 1.5px solid #959595;
        box-sizing: border-box;
    }

    .article-heading {
        width: 281px;
        top: -23px;
    }

    .article-box {
        margin-top: 40px;
    }

    .menu-link-deco {
        display: none;
    }
}

</style>

