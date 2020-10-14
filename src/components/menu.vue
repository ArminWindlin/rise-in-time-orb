<template>
    <div class="top-container">
        <div id="menu" class="row">
            <div class="menu"
                 v-bind:class="{ active: isActive, 'menuWindow': isActive &&  width < 549 }">
                <router-link class="logo-container" to="/">
                    <img class="logo-image" src="../assets/logo.svg">
                    <div v-if="!$isMobile" class="logo-text">Orb</div>
                </router-link>
                <div class="dropdown" v-for="(menuDropDown, i) in menuDropDowns" v-bind:key="menuDropDown.menuLink">
                    <button v-if="!noDropDowns.includes(menuDropDown.menuLink)" v-bind:key="menuDropDown.key"
                            class="dropdown-button"
                            v-bind:class="{'first-link-element': i === 0, 'disable-list': $isMobile}">
                        {{ menuDropDown.menuLink }}
                    </button>
                    <button v-if="noDropDowns.includes(menuDropDown.menuLink)" class="dropdown-button"
                            @click="navigateToStandaloneComponent(menuDropDown.menuLink.toLowerCase())">
                        {{ menuDropDown.menuLink }}
                    </button>
                    <img class="menu-link-deco"
                         src="../assets/groups/rectangle-menu-link.svg">

                    <div class="dropdown-content" :class="{'first-dropdown-content': i === 0}">
                        <router-link :to="{path: replaceWhiteSpaces(menuDropDownItem.toLowerCase())}"
                                     v-for="(menuDropDownItem  ) in menuDropDown.dropDowns"
                                     v-bind:key="menuDropDownItem.index" href="#">{{ menuDropDownItem }}
                        </router-link>
                    </div>
                </div>
                <div v-if="showInput" class="article-search-input"><input class="article-search-input" type="text"
                                                                          placeholder="Suche..."
                                                                          name="search">
                    <div class="menu-search-icon-box"><img class="menu-search-icon"
                                                           src="../assets/groups/search-input-menu.svg"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import menuDropDowns from '../data/menuDropdowns.json';

export default {
    name: 'Menu',

    data() {
        return {
            openedDropdown: '',
            isActive: false,
            test: true,
            width: 0,
            menuDropDowns: [],
            dropDownIndex: -1,
            showInput: true,
            router: this.$router,
            noDropDowns: []
        };
    },
    methods: {
        calculateWidth() {
            window.onresize = calculateWindowSize;
            window.onload = calculateWindowSize;

            function calculateWindowSize() {
                this.width = window.innerWidth;
            }
        },
        navigateToStandaloneComponent(componentString) {
            if (this.$route.path !== `/${this.replaceWhiteSpaces(componentString)}`)
                this.router.push(`/${this.replaceWhiteSpaces(componentString)}`);
        },
        replaceWhiteSpaces(str) {
            return str.replace(' ', '-').replace(' ', '-');
        }
    },
    beforeMount() {
        this.menuDropDowns = menuDropDowns;
        this.noDropDowns = this.menuDropDowns.filter(el => !el.isDropDown).map(el => el.menuLink);
        this.calculateWidth();
        this.showInput = this.$parent.showInput;
    }
};
</script>

<style lang="scss">

.top-container {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.menu-search-icon-box {
    position: absolute;
    z-index: 2000;
    right: 14px;
    top: 15px;
}

.row {
    display: flex;
}

.menu-search-icon {
    width: 22.41px;
    height: 25.5px;
}

input {
    border: none;
    text-align: center;
    box-shadow: none;
    padding: 0;
    font-size: 16px;
    font-family: Noto Sans TC;
    outline: none;
}

.article-search-input {
    width: 200px;
    height: 55px;
    background: #E4DDD1;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
    border-radius: 0px 5px 5px 0px;
    margin: 0 auto 0 auto;
    position: absolute;
    right: 0px;
    color: rgba(197, 197, 197, 0.42);
}

.menu-link-deco {
    width: 8.2px;
    height: 12.2px;
    margin-left: -8px;
}

.first-dropdown-content {
    margin-left: 41px;
}

.dropdown-button {
    color: #6C6C6C;
    padding: 19px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-family: Verdana, Arial, sans-serif;
    outline: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    opacity: 0.9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    font-size: 14px;
    border-radius: 5px;
}

.dropdown-content a {
    color: #6C6C6C;
    padding: 10px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropdown-button {

    height: 55px;
}

ul {
    list-style: none;
}

#menu {
    width: 100%;
}

.logo-text {
    font-size: 14px;
    color: #000000;
    text-decoration: none;
    flex: 4;
}

.logo-image {
    flex: 1;
}

.menu {
    display: flex;
    width: 100%;
    height: 55px;
    background: #EEE7DD;
    border-radius: 5px;
    min-width: 301.5px;
    position: relative;
    flex: 1;
    margin-top: 20px;

    &__item {
        position: relative;
        margin-right: 10px;
    }

    &__link {
        color: #6C6C6C;
        text-decoration: none;
        font-size: 12px;
        position: relative;

        &:hover {
            color: #2092c3;
        }
    }
}

li.menu__item.menu__item {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 30px;
}

.open .dropdown-menu {
    display: block;
}

.logo-container {
    margin-top: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    width: 10%;
    align-items: center;
    justify-content: center;
}

.dropdown-menu {
    top: 30px;
    font-size: 0.9rem;
    position: absolute;
    min-width: 130px;
    display: none;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    z-index: 500;
}

.dropdown-menu__link {
    display: block;
    padding: 1em;
    background-color: #f9f5f0;
    color: black;
    text-decoration: none;
    font-size: 11px;
    border-radius: 2px;

    &:hover {
        color: #2092c3;
        background-color: #ccc;
    }
}

.close {
    position: absolute;
    right: 14vw;
    top: 52px;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 5px;
    background-image: url('../assets/CrossBlack.svg');
    background-size: cover;
}

.first-link-element {
    margin-left: 41px;
}

@media screen and (max-width: 1280px) {
    .article-search-input {
        display: none;
    }
}

@media screen and (max-width: 700px) {

    .first-link-element {
        padding-left: 0px;
    }
}

@media screen and (max-width: 400px) {

    ul.menuWindow {
        flex-direction: column;
        margin: 0;
        min-width: 0;
        width: 100vw;
    }

    li.menu__item.menu__item {
        text-align: center;
        width: 100vw;
        margin: 20px 0 0 0;
    }

    li.menu__item.menu__item:first-of-type {
        margin-top: 70%;
    }

    .disable-list {
        display: none;
    }

    ul.active {
        top: 0;
        left: 0;
        position: absolute;
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        margin-top: 0;
    }

    .dropdown-menu {
        position: relative;
        margin-bottom: 40px;
    }
}

.top-container {
    max-height: 20vh;
}

.logo-container {
    margin-top: unset;
    margin-left: unset;
    display: flex;
    flex-direction: row;
    width: 18%;
}

.logo-image {
    margin: 10px;
}

.menu {
    margin-top: unset;
}

</style>
