<template>
    <div class="wiki">
        <div class="background"></div>
        <div class="container">
            <Menu v-if="!$isMobile"></Menu>
            <div class="flex-mobile-menu" v-if="$isMobile">
                <div class="mobile-logo-container">
                    <router-link to="/"><img class="mobile-logo-image" src="../assets/logo.svg"></router-link>
                </div>
                <div class="mobile-form-container">
                    <form action="/" v-if="$isMobile" class="input-form">
                        <div class="input-field" v-if="$isMobile">
                            <input class="search-input" type="text" placeholder="Suche..." name="search">
                            <img class="search-icon" src="../assets/Union.svg">
                        </div>
                    </form>
                </div>
                <div class="mobile-menu-container">
                </div>
            </div>
            <MobileMenu v-if="$isMobile" class="mobile-menu"></MobileMenu>
            <!-- <form action="/" v-if="$isMobile">
                 <div class="input-field" v-if="$isMobile">
                     <router-link to="/"><img class="logo-image-mobile" src="../assets/logo.svg"></router-link>
                     <input class="search-input" type="text" placeholder="Suche..." name="search">
                     <img class="search-icon" src="../assets/Union.svg">
                 </div>
             </form>
             <div class="mobile-menu-wrapper">
                 <MobileMenu v-if="$isMobile"></MobileMenu>
             </div>-->
            <div class="article-box article-box-header-reverse">
                <div class="article-header-text-box">
                    <h2 class="article-header-title">{{ wikiArticles.title }}</h2>
                    <p class="header-paragraph" v-html="wikiArticles.paragraph">{{ wikiArticles.paragraph }}</p>
                </div>
                <div class="article-header-image-box" v-if="wikiArticles.image"
                     v-bind:style="{ 'background-image': 'url(' + require('../assets/articles/' +  articleName + '/' + wikiArticles.image) + ')' }">
                    <img v-if="!$isMobile" class="vector-for-blocks-header"
                         src="../assets/groups/vector-for-blocks.svg">
                    <img class="mobile-image-deco" v-if="$isMobile" src="../assets/mobile-image-deco.svg">
                </div>
            </div>
            <div class="dynamic-elements-group" v-for="(chapter, i) in wikiArticles.chapters"
                 v-bind:key="chapter.index">
                <div class="divider"><img class="paragraph-divider" v-if="!$isMobile"
                                          src="../assets/groups/vector-divider.svg"><img
                        class="divider-mobile" v-if="$isMobile" src="../assets/groups/divider-mobile.svg"></div>
                <div class="article-box dynamic-box" v-bind:class="{'reverse-element': i%2 !== 0}">
                    <div class="image-block-dynamic">
                        <div class="image-container"
                             v-bind:style="{ 'background-image': 'url(' + require('../assets/articles/' +  articleName + '/' + wikiArticles.chapters[i].image) + ')' }"
                             v-bind:class="{'reverse-image': i%2 !== 0}"><img v-if="!$isMobile"
                                                                              class="vector-for-blocks-block-image"
                                                                              src="../assets/groups/vector-for-blocks.svg">
                        </div>
                    </div>
                    <div class="paragraph-block-dynamic">
                        <div class="title-paragraph-box"
                             v-bind:class="{'paragraph-dynamic': !$isMobile, 'paragraph-dynamic-mobile': $isMobile, }">
                            <div v-bind:class="{'dynamic-paragraph-content': !$isMobile}">
                                <img v-if="!$isMobile" class="vector-for-blocks paragraph-vector"
                                     src="../assets/groups/paragraph-vector.svg">
                                <h2 class="dynamic-title">{{ chapter.subtitle }}</h2>
                                <p v-bind:class="{'dynamic-paragraph': $isMobile}" v-html="chapter.paragraph">
                                    {{ chapter.paragraph }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$isMobile" class="mobile-image-deco-footer">
                <img class="mobile-image-deco-reverse" v-if="$isMobile" src="../assets/mobile-image-deco.svg">
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import Menu from '../components/menu.vue';
import MobileMenu from '../components/mobileMenu';

export default {
    name: 'wiki',
    components: {
        Menu, MobileMenu
    },
    props: ['wiki'],
    data() {
        return {
            wikiArticles: [],
            articleName: '',
            chapterNumber: 0,
            showInput: true
        };
    },
    watch: {
        $route(to, from) {
            this.articleName = this.$route.params.id;
            this.wikiArticles = [];
            import('../data/wiki_articles/fields/' + this.articleName + '.json').then((e) => {
                        this.wikiArticles = e;
                    }
            );
        }
    },
    methods: {},
    beforeMount() {
        this.articleName = this.$route.params.id;
        console.log("articleName: " + this.articleName);
        import('../data/wiki_articles/fields/' + this.articleName + '.json').then((e) => {
                    this.wikiArticles = e;
                }
        );
    },
    mounted() {
    }
};
</script>

<style scoped>

/*Vectors for Blocks*/
.dynamic-elements-group:last-child {
    margin-bottom: 50px;
}

.header-paragraph {
    height: auto;
    font-size: 17px;
    margin-right: 150px;
    white-space: pre-line;
    color: #6C6C6C;
    line-height: 26px;
    margin-top: 10px;
    margin-left: -6px;
}

.vector-for-blocks, .vector-for-blocks-header, .vector-for-blocks-block-image {
    position: absolute;
    top: -12px;
    width: 26px;
}

.vector-for-blocks {
    left: -18px;
}

.vector-for-blocks-header {
    left: -20px;
}

.vector-for-blocks-block-image {
    left: -19px;
}

.menu {
    width: 91%;
    margin: 80px auto 0 auto;
    position: relative;
}

.paragraph-divider {
    width: 620px;
}

.divider {
    width: 600px;
    margin: 20px auto -6px auto;
}

.paragraph-dynamic-mobile {
    width: 300px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: justify;
}

.dynamic-paragraph {
    width: 309px;
    margin-left: -6px;
    line-height: 20px;
}

/*Blocks within the article*/
.article-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 75%;
    margin: 45px auto 0 auto;
    height: auto;
}

.reverse-element {
    flex-direction: row-reverse;
}

.reverse-image {
    margin-left: auto;
}

.dynamic-box {
    margin-top: 30px;
    height: auto;
}

.article-header-text-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
}

.image-block-dynamic {
    display: flex;
    flex-direction: column;
    flex: 2.1;
}

.article-header-image-box {
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    border: 2px solid #959595;
    box-sizing: border-box;
    position: relative;
    width: 388px;
    height: 388px;
}

.divider-mobile {
    margin-top: 10px;
}

.image-container {
    background-repeat: no-repeat;
    background-size: cover;
    width: 290px;
    height: 290px;
    border: 2px solid #959595;
    box-sizing: border-box;
    position: relative;
}

.paragraph-block-dynamic {
    display: flex;
    flex-direction: row;
    flex: 4;
    position: relative;
}

.dynamic-paragraph-content {
    margin: 4% 26px 5% 26px;
}

.paragraph-dynamic {
    height: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #FFFFFF;
    border: 1px solid #959595;
    box-sizing: border-box;
    font-size: 17px;
    line-height: 25px;
    text-align: justify;
    color: #6C6C6C;
    white-space: pre-line;
}

.article-header-title {
    text-align: left;
    font-size: 18px;
    line-height: 35px;
    color: #6C6C6C;
    margin-left: -6px;
}

.wiki {
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
}

strong {
    font-weight: bold;
}

.container {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100vh;
}

.background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    background: #f9f5f0;
}

h2 {
    font-size: 24px;
    text-align: center;
}

.dynamic-title {
    font-size: 17px;
    line-height: 26px;
    text-align: justify;
    color: #6C6C6C;
    margin-bottom: 10px;
}

/*CSS Mobile*/
@media screen and (max-width: 1280px) {
    .article-box {
        flex-direction: column;
        text-align: justify;
    }

    .article-box-header-reverse {
        flex-direction: column-reverse;
    }

    .article-header-image-box {
        margin: 0 auto 0 auto;
    }

    .header-paragraph {
        margin: 0 auto 0 auto;
    }

    .article-header-title {
        margin-top: 20px;
        text-align: center;
    }

    .image-container {
        margin: 0 auto 30px auto;
    }

    .paragraph-divider {
        display: none;
    }

    .dynamic-elements-group {
        margin-top: 20px;
    }
}

@media screen and (max-width: 380px) {

    .dynamic-elements-group {
        margin-bottom: 0;
    }

    .mobile-menu {
        margin-top: 8px;
    }

    .mobile-logo-image {
        margin-top: 30px;
    }

    .mobile-logo-container {
        flex: 1;
    }

    .mobile-form-container {
        flex: 2.8;
    }

    .mobile-menu-container {
        flex: 1;
    }

    .flex-mobile-menu {
        display: flex;
        flex-wrap: nowrap;
        width: 279px;
        margin: -15px auto 0 auto;
    }

    .flex-mobile-menu > div {
        width: 100px;
        margin: 0;
    }

    .input-field {
        width: 100%;
    }

    .search-input {
        width: 100%;
        margin: 0;
        position: initial;
        padding: 0;
        height: 43px;
        font-size: 15px;
    }

    .search-icon {
        margin-right: -48px;
        height: 34px;
        width: 21px;
        margin-top: -5px;
        right: 55px;
    }

    .wiki {
        overflow-x: hidden;
    }

    .article-box {
        flex-direction: column;
        width: 95%;
    }

    .article-header-title {
        margin: 10px auto 0 auto;
        color: #959595;
    }

    .dynamic-title {
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #959595;
        margin-bottom: 5px;
    }

    .article-header-image-box {
        margin: 0 auto 0 auto;
        width: 279px;
        height: 171px;
    }

    .article-header-text-box {
        margin: 0 auto 0 auto;
        height: auto;
        min-height: 0px;
    }

    .article-box {
        height: auto;
    }

    .paragraph-block-dynamic {
        margin-top: 15px;
        min-height: 0;
    }

    .article-box-header-reverse {
        flex-direction: column-reverse;
    }

    .mobile-image-deco {
        margin: -33px auto 0 auto;
        width: 123.51px;
        height: 18.26px;
    }

    .header-paragraph {
        margin: 0px auto 0 auto;
        width: 279px;
        height: auto;
        font-size: 12px;
        line-height: 17px;
        text-align: justify;
        color: #000000;
    }

    .divider-mobile {
        width: 287px;
        display: block;
        margin: 0 auto 0 auto;
    }

    .divider {
        width: auto;
        height: 30px;
        margin-top: 23px;
    }

    .image-container {
        width: 279px;
        height: 171px;
        margin: 0 auto 0 auto;
    }

    .dynamic-paragraph {
        margin: 0;
        font-size: 12px;
        line-height: 17px;
        text-align: justify;
        width: 279px;
        white-space: pre-line
    }

    .title-paragraph-box {
        width: auto;
        margin: 0 auto 0 auto;
    }

    .mobile-image-deco-reverse {
        transform: rotate(180deg);
        width: 123.51px;
        height: 18.26px;
        margin-bottom: 30px;
    }

    .mobile-image-deco-footer {
        display: block;
        margin: 20px auto 15px auto;
    }
}

</style>
