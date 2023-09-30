<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/hell.jpg" alt />
                <span>个人运动平台</span>
            </div>
            <el-button type="info" @click="logout">退出安全</el-button>
        </el-header>
        <el-container>
            <el-aside width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapase">|||</div>
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true"
                :default-active="activePath">
                   <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObject[item.id]"></i>
                            <span>{{ item.title }}</span>
                        </template>

                        <el-menu-item :index="it.path+''" v-for="it in item.sList" :key="it.id" @click="saveNavState(it.path)">
                            <template slot="title">
                                <i :class="iconsObject[it.id]"></i>
                                <span>{{it.title}}</span>
                            </template>
                        </el-menu-item>
                   </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view>
                    
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import router from '@/router';

export default {
    data() {
        return {
            menuList: [],
            isCollapse: false,
            iconsObject: {
                '100': 'iconfont icon-guanliyuan_guanliyuanliebiao',
                '200': 'iconfont icon-yundong',
                '101': 'iconfont icon-denglu',
                '102': 'iconfont icon-mima',
                '103': 'iconfont icon-yundong',
                '104': 'iconfont icon-shangpin',
                '201': 'iconfont icon-tushu',
                '202': 'iconfont icon-qialuli',
                '203': 'iconfont icon-shiwu',
                '204': 'iconfont icon-denglu',
            },
            activePath:'/welcome',
        };
    },
    created() {
        // 查询
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        async getMenuList() {
            const { data: res } = await this.$http.get("menus");
            console.log(res);
            if (res.flag != 200)
                return this.$message.error("获取列表失败！！！");
            this.menuList = res.menus; //数据回填
        },
        toggleCollapase() {
            this.isCollapse = !this.isCollapse;
        },
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath); //存放在session里
            this.activePath = activePath;
        }
    },
    components: { router }
}
</script>

<style lang='less' scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.el-aside {
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

img {
    width: 100px;
    height: 55px;
}

.toggle-button{
    background-color: #4A4064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>