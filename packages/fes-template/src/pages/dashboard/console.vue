<template>
    <div class="page page-console">
        <div class="page-header">
            <div class="page-header-title">工作台</div>
            <div class="page-hader-content">
                <img
                    class="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png"
                />
                <div class="user">
                    <div class="user-wellcome">早安，Harry，祝你开心每一天！</div>
                    <div class="user-role">
                        前端开发工程师 | 某某公司-某某部门-某某科室
                    </div>
                </div>
                <div class="report">
                    <div class="report-item">
                        <span class="report-item-name">项目数量</span>
                        <span class="report-item-score">56</span>
                    </div>
                    <div class="report-item">
                        <span class="report-item-name">团队内排名</span>
                        <span class="report-item-score">8 / 24</span>
                    </div>
                    <div class="report-item">
                        <span class="report-item-name">项目访问</span>
                        <span class="report-item-score">2,223</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <Row>
                <Cell span="16" class="pr-16">
                    <Card title="进行中的项目">
                        <a slot="extra" href="">全部项目</a>
                        <div slot="body" class="grid-project">
                            <div v-for="(item, i) in projects" :key="i" class="grid-project-item">
                                <div class="grid-project-title">
                                    <img :src="item.icon" />
                                    <span>{{item.title}}</span>
                                </div>
                                <div class="grid-project-desc">{{item.desc}}</div>
                                <div class="grid-project-content">
                                    <span>{{item.group}}</span>
                                    <span class="grid-project-time">{{item.time}}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card class="mt-16" title="动态">
                        <div slot="body" class="list-dynamic">
                            <div v-for="(item, i) in projects" :key="i" class="list-dynamic-item">
                                <img
                                    class="list-dynamic-logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png"
                                />
                                <div class="list-dynamic-content">
                                    曲丽丽 在 <a>高逼格设计天团</a> 新建项目 <a>六月迭代</a>
                                    <div class="list-dynamic-desc">3 小时前</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Cell>
                <Cell span="8">
                    <Card title="快速开始 / 便捷导航">
                        <div slot="body" class="grid-nav">
                            <div v-for="(item, i) in navs" :key="i" class="grid-nav-item">
                                {{item}}
                            </div>
                            <div>
                                <Wb-button icon="md-add" type="ghost">添加</Wb-button>
                            </div>
                        </div>
                    </Card>

                    <Card class="mt-16" title="幸运指数">
                        <div slot="body" class="card-chart">
                            <Chart :data="chartData" :options="chartOptions"></Chart>
                        </div>
                    </Card>

                    <Card class="mt-16" title="团队">
                        <div slot="body" class="grid-group">
                            <div v-for="(item, i) in projects" :key="i" class="grid-group-item">
                                <img :src="item.icon" class="grid-group-icon" />
                                <span class="grid-group-name">{{item.group}}</span>
                            </div>
                        </div>
                    </Card>
                </Cell>
            </Row>
        </div>
    </div>
</template>
<script>
import DataSet from '@antv/data-set';


export default {
    FesData() {
        return {
            projects: [
                {
                    icon: 'https://cn.vuejs.org/images/logo.png',
                    title: 'Vue',
                    desc: '那是一种内在的东西，他们到达不了，也无法触及的',
                    group: '科学搬砖组',
                    time: '2 小时前'
                },
                {
                    icon:
                        'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
                    title: 'Angular',
                    desc: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
                    group: '中二少女团',
                    time: '3 年前'
                },
                {
                    icon:
                        'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
                    title: 'React',
                    desc: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
                    group: 'javascript',
                    time: '2 小时前'
                },
                {
                    icon:
                        'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
                    title: 'Bootstrap',
                    desc: '那时候我只会想自己想要什么，从不想自己拥有什么',
                    group: 'java',
                    time: '2 小时前'
                },
                {
                    icon:
                        'https://s.cn.bing.net/th?id=OJ.wjuHWOYyiQYnjw&pid=MsnJVFeeds&w=16&h=16',
                    title: 'Wechat',
                    desc: '凛冬将至',
                    group: '部落',
                    time: '2 小时前'
                },
                {
                    icon:
                        'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    title: 'Alipay',
                    desc: '生命就像一盒巧克力，结果往往出人意料',
                    group: '联盟',
                    time: '2 小时前'
                }
            ],
            navs: ['操作一', '操作二', '操作三', '操作四', '操作五', '操作六'],
            chartData: [],
            chartOptions: {
                scale: {
                    score: {
                        min: 0,
                        max: 100
                    }
                },
                coordinate: {
                    type: 'polar',
                    cfg: {
                        radius: 0.85
                    }
                },
                tooltip: {
                    shared: true,
                    showCrosshairs: true,
                    crosshairs: {
                        line: {
                            style: {
                                lineDash: [4, 4],
                                stroke: '#333'
                            }
                        }
                    }
                },
                axis: {
                    item: {
                        line: null,
                        tickLine: null,
                        grid: {
                            line: {
                                style: {
                                    lineDash: null
                                }
                            }
                        }
                    },
                    score: {
                        line: null,
                        tickLine: null,
                        grid: {
                            line: {
                                type: 'line',
                                style: {
                                    lineDash: null
                                }
                            }
                        }
                    }
                },
                line: {
                    position: 'item*score',
                    color: 'user',
                    size: 2
                },
                point: {
                    position: 'item*score',
                    color: 'user',
                    shape: 'circle',
                    size: 4,
                    style: {
                        stroke: '#fff',
                        lineWidth: 1,
                        fillOpacity: 1
                    }
                }
            }
        };
    },
    FesReady() {
        const data = [
            {
                item: '热度',
                a: 70,
                b: 10,
                c: 70
            },
            {
                item: '引用',
                a: 100,
                b: 30,
                c: 40
            },
            {
                item: '口碑',
                a: 80,
                b: 90,
                c: 10
            },
            {
                item: '产出',
                a: 40,
                b: 60,
                c: 60
            },
            {
                item: '贡献',
                a: 50,
                b: 30,
                c: 60
            }
        ];
        const { DataView } = DataSet;
        const dv = new DataView().source(data);
        dv.transform({
            type: 'rename',
            map: {
                a: '个人',
                b: '团队',
                c: '部门'
            }
        });
        dv.transform({
            type: 'fold',
            fields: ['个人', '团队', '部门'], // 展开字段集
            key: 'user', // key字段
            value: 'score' // value字段
        });
        this.chartData = dv.rows;
    },
    FesBeforeDestroy() {
    },
    methods: {}
};
</script>
<style lang="scss">
@import "~@/assets/styles/variables";
.page.page-console{
  font-size: 14px;
  .page-header {
    .page-hader-content {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .avatar {
        width: 60px;
        height: 60px;
        margin-right: 16px;
      }
      .user {
        flex: 1;
        .user-wellcome {
          font-size: 18px;
          color: $title-color;
        }
        .user-role {
          margin-top: 8px;
        }
      }
      .report {
        min-width: 420px;
        margin-left: 88px;
        display: flex;
        .report-item {
          flex: 1;
          display: flex;
          padding: 0 32px;
          flex-direction: column;
          align-items: flex-end;
          position: relative;
          &:not(:last-child):before{
              content: "";
              position: absolute;
              right: 0;
              top: 6px;
              bottom: 6px;
              width: 1px;
              background: $border-color-split;
          }
          &:last-child{
              padding-right: 0;

          }
          .report-item-name {
            margin-bottom: 4px;
          }
          .report-item-score {
            font-size: 24px;
            font-weight: 500;
          }
        }
      }
    }
  }
  .page-body {
    background: #f0f2f5;
    border: none;

    .grid-project {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      .grid-project-item {
        padding: 24px;
        border: 0px;
        box-shadow: rgb(240, 240, 240) 1px 0px 0px 0px,
          rgb(240, 240, 240) 0px 1px 0px 0px, rgb(240, 240, 240) 1px 1px 0px 0px,
          rgb(240, 240, 240) 1px 0px 0px 0px inset,
          rgb(240, 240, 240) 0px 1px 0px 0px inset;
        transition: all 0.3s ease 0s;
        &:hover {
          position: relative;
          z-index: 1;
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
            0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
        }
      }
      .grid-project-title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 16px;
        img {
          width: 24px;
          height: auto;
        }
        span {
          margin-left: 8px;
        }
      }
      .grid-project-desc {
        height: 44px;
        overflow: hidden;
        color: $sub-text-color;
        line-height: 22px;
        font-size: 14px;
      }
      .grid-project-content {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .grid-project-time {
          color: rgba($sub-text-color, 0.85);
        }
      }
    }
    .grid-nav {
      display: grid;
      padding: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(4, 25%);
      .grid-nav-item {
        line-height: 24px;
      }
      .ui-button {
        padding: 2px 8px;
      }
    }
    .card-chart {
      padding: 20px;
    }
    .grid-group {
      display: grid;
      padding: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(2, 50%);
      .grid-group-item {
        display: flex;
        align-items: center;
      }
      .grid-group-icon {
        width: 24px;
        height: auto;
      }
      .grid-group-name {
        margin-left: 8px;
      }
    }
    .list-dynamic {
      padding: 8px 24px 8px 24px;
      .list-dynamic-item {
        padding: 16px 24px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        &:last-child {
          border: 0;
        }
        .list-dynamic-logo {
          margin-right: 16px;
          width: 24px;
          height: 24px;
        }
        .list-dynamic-content {
          flex: 1;
          .list-dynamic-desc {
            margin-top: 4px;
            color: $sub-text-color;
          }
        }
      }
    }
  }
}
</style>
