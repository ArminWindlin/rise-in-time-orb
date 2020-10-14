<template>
    <div>
        <div class="menu-bar-box">
            <div @click="activateMenuWindow()" class="menu-bar"></div>
        </div>
        <div class="menu-window" v-if="menuIsActive"></div>
        <div v-if="menuIsActive" class="exit-icon" @click="activateMenuWindow()"></div>
        <router-link to="/"><img @click="activateMenuWindow()" class="mobile-menu-soulstone" v-if="menuIsActive"
                                 src="../assets/logo.svg"></router-link>
        <div v-if="menuIsActive" class="menu-link-element-block" ref="block">
            <div v-for="(menuItem, i) in menuItems" :key="menuItem.key" class="link-element">
                <div v-if="noDropDowns.includes(menuItem.menuLink)" class="menuLink"
                     @click="navigateToStandaloneComponent(menuItem.menuLink.toLowerCase())">{{ menuItem.menuLink }}
                </div>
                <div v-if="!noDropDowns.includes(menuItem.menuLink)" @click="displayDropDown(i)" class="menuLink">
                    {{ menuItem.menuLink }}
                </div>
                <div v-if="showDropDown(i)" class="triangle"
                     :class="{'element-enable': menuItem.dropDownActive}">
                    <div class="inner-triangle" :class="{'element-enable': menuItem.dropDownActive}"></div>
                </div>
                <div v-if="showDropDown(i)" class="links-subcategories"
                     :class="{'element-enable': menuItem.dropDownActive}">
                    <div class="sublinks-container">
                        <div v-for="subLink in menuItem.dropDowns"
                             v-bind:key="subLink.index" class="subLink">
                            <router-link class="router-link"
                                         :to="{path:replaceWhiteSpaces(subLink.toLowerCase())}">
                                <span v-on:click="activateMenuWindow()">{{ subLink }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuItems from '../data/menuDropdowns.json';

export default {
    name: 'MobileMenu',
    data() {
        return {
            menuIsActive: false,
            menuItems: [],
            dropDown: 100,
            router: this.$router,
            noDropDowns: []
        };
    },
    methods: {
        activateMenuWindow() {
            this.menuIsActive = !this.menuIsActive;
            this.closeDrowns();
        },
        showDropDown(i) {
            return this.menuItems[i].isDropDown;
        },
        displayDropDown(i) {
            this.menuItems[i].dropDownActive = !this.menuItems[i].dropDownActive;
        },
        replaceWhiteSpaces(str) {
            return str.replace(' ', '-').replace(' ', '-');
        },
        navigateToStandaloneComponent(componentString) {
            this.router.push(`/${this.replaceWhiteSpaces(componentString)}`);
        },
        closeDrowns() {
            let dropDownsNumber = 0;
            for (let i = 0; i < this.menuItems.length; i++) {
                if (this.menuItems[i].isDropDown) {
                    dropDownsNumber++;
                }
                for (let i = 0; i < dropDownsNumber; i++) {
                    this.menuItems[i].dropDownActive = false;
                }
            }
        }
    },
    beforeMount() {
        this.menuItems = MenuItems;
        this.noDropDowns = this.menuItems.filter(el => !el.isDropDown).map(el => el.menuLink);
    }
};
</script>

<style>

.menu-bar {
    background-image: url("../assets/groups/mobile-menu.svg");
    width: 32px;
    height: 24px;
    position: absolute;
    top: 10px;
    right: 10px;
}

.menu-bar-box {
    position: relative;
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
    background: #F9F5F0;
    height: 50px;
}

.menu-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: #F9F5F0;
}

.exit-icon {
    background-image: url("../assets/groups/exit-icon.svg");
    width: 34.8px;
    height: 34.8px;
    position: absolute;
    z-index: 2000;
    top: 23px;
    right: 48px;
}

.mobile-menu-soulstone {
    /*
            background-image: url("../assets/groups/mobile-menu-soulstone.svg");
    */
    position: absolute;
    z-index: 2000;
    height: 50px;
    top: 18px;
    left: 48px;
}

.menu-link-element-block {
    display: block;
    z-index: 1000;
    left: 0;
    right: 0;
    margin: 10px;
    height: auto;
    width: auto;
    position: relative;
    top: 20px;
}

.link-element {
    margin: 0 auto 0 auto;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    color: #959595;
    font-weight: 500;
    height: auto;
}

.links-subcategories {
    background: #FFFFFF;
    border: 1.5px solid #C4C4C4;
    box-sizing: border-box;
    height: auto;
    width: 281px;
    left: 0;
    right: 0;
    margin: 15px auto auto auto;
    border-radius: 3px;
    display: none;
}

.subLink {
    height: auto;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    width: auto;
}

.sublinks-container {
    width: auto;
    margin: 15px auto 15px auto;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #C4C4C4;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: none;
}

.inner-triangle {
    position: relative;
    width: 0;
    left: -9.6px;
    top: 3.5px;
    height: 0;
    border-left: 9.5px solid transparent;
    border-right: 9.5px solid transparent;
    border-bottom: 14px solid #FFFFFF;
    display: none;
}

.element-enable {
    display: block;
}

.menu-deco {
    width: 96.45px;
    height: 14.26px;
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    margin: 20px auto auto auto;
}

.router-link {
    text-decoration: none;
    color: #959595;
}

</style>