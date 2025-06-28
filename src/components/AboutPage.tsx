import React from 'react';
import { Heart, Users, Star, Github, Award, Calendar, ArrowLeft, ExternalLink, Code, Globe, Zap, Mail, MessageCircle, User } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const contributors = [
    {
      name: "医学专家团队",
      role: "医学顾问 & 内容审核",
      avatar: "👨‍⚕️",
      contribution: "提供专业医学指导，制定并发症处理标准，确保内容科学性"
    },
    {
      name: "护理专家团队",
      role: "护理流程优化",
      avatar: "👩‍⚕️",
      contribution: "完善护理流程，优化患者体验，提供实用护理建议"
    },
    {
      name: "技术开发团队",
      role: "全栈开发 & 架构设计",
      avatar: "👨‍💻",
      contribution: "系统架构设计，前端开发实现，AI技术集成"
    },
    {
      name: "小X宝社区志愿者",
      role: "内容创作 & 测试反馈",
      avatar: "👥",
      contribution: "内容校对，用户体验测试，功能需求收集"
    },
    {
      name: "患者家属群体",
      role: "需求提供 & 实际验证",
      avatar: "❤️",
      contribution: "提供真实需求，参与功能测试，分享使用经验"
    },
    {
      name: "天工开物基金会",
      role: "项目管理 & 资源支持",
      avatar: "🏛️",
      contribution: "项目治理，资源协调，社区规范管理"
    }
  ];

  const versions = [
    {
      version: "v2.1.0",
      date: "2024-12-28",
      features: [
        "新增实时在线用户统计",
        "优化访问计数系统",
        "改进数据库性能",
        "增强用户体验"
      ],
      type: "feature"
    },
    {
      version: "v2.0.0",
      date: "2024-12-20",
      features: [
        "重构整体架构",
        "新增Supabase数据库支持",
        "实现访问统计功能",
        "优化移动端体验"
      ],
      type: "major"
    },
    {
      version: "v1.5.0",
      date: "2024-12-15",
      features: [
        "新增血栓并发症管理",
        "完善腹水处理指引",
        "优化卡片预览功能",
        "修复已知问题"
      ],
      type: "feature"
    },
    {
      version: "v1.0.0",
      date: "2024-12-01",
      features: [
        "首次正式发布",
        "支持6种主要并发症",
        "完整的指引卡生成功能",
        "本地数据处理保护隐私"
      ],
      type: "major"
    }
  ];

  const communityProjects = [
    {
      name: "小胰宝助手",
      description: "胰腺癌患者专业AI助手",
      links: [
        { name: "科普版", url: "https://chat.xiaoyibao.com.cn" },
        { name: "Pro版", url: "https://pro.xiaoyibao.com.cn" },
        { name: "Deepseek版", url: "https://deepseek.xiaoyibao.com.cn" }
      ],
      icon: "🥞"
    },
    {
      name: "小肺宝助手",
      description: "肺癌患者专业AI助手",
      links: [
        { name: "体验版", url: "https://chat.xiaofeibao.com.cn" }
      ],
      icon: "🫁"
    },
    {
      name: "小萌宝助手",
      description: "儿童肿瘤患者AI助手",
      links: [
        { name: "Pro版", url: "https://pro.xiaomengbao.cn/" }
      ],
      icon: "👶"
    },
    {
      name: "小粉宝助手",
      description: "乳腺癌患者AI助手",
      links: [
        { name: "体验版", url: "https://xfb.xiaoyibao.com.cn" }
      ],
      icon: "🎀"
    },
    {
      name: "小胃宝助手",
      description: "胃癌患者AI助手（首个社区合作项目）",
      links: [
        { name: "科普版", url: "https://chat.xiaoweibao.com.cn" },
        { name: "专业版", url: "https://pro.xiaoweibao.com.cn" }
      ],
      icon: "🍽️"
    },
    {
      name: "小飞侠助手",
      description: "首个罕见病领域AI应用",
      links: [],
      icon: "🦸"
    }
  ];

  const openSourceProjects = [
    {
      name: "小胰宝小程序",
      url: "https://github.com/pancrePal-xiaoyibao/pancrePal-xiaoyibao",
      description: "小胰宝微信小程序源码"
    },
    {
      name: "肿瘤患者心理助手提示词",
      url: "https://github.com/hhx465453939/MedicRAG",
      description: "医学AI提示词开源项目"
    },
    {
      name: "MinerU-xyb",
      url: "https://github.com/PancrePal-xiaoyibao/miniapp-uniapp",
      description: "文档解析优化版本"
    },
    {
      name: "FastGPT微信集成",
      url: "https://github.com/hanfangyuan4396/fastgpt-on-wechat",
      description: "FastGPT与微信的集成方案"
    },
    {
      name: "中国肿瘤临床试验查询",
      url: "https://github.com/PancrePal-xiaoyibao/search_china_trials",
      description: "临床试验信息查询工具"
    }
  ];

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800 border-red-200';
      case 'feature': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回主页</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">关于小红卡</h1>
                <p className="text-sm text-gray-600">小X宝社区 · 产品介绍</p>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 项目介绍 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">小红卡项目</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                专为肿瘤患者设计的并发症管理指引卡生成器，让每一位患者都能拥有个性化的紧急处理指南
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    项目特色
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>专业医学指导，权威可靠</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>数据本地处理，隐私安全</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>个性化定制，精准匹配</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>免费公益服务，惠及患者</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>开源透明，社区共建</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 text-blue-500 mr-2" />
                    服务对象
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>25+癌种患者及家属</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>280+罕见病患者群体</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>医护人员参考使用</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>患者家属和照护者</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">核心功能</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🩸</div>
                      <div className="text-sm font-medium">消化道出血</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🔄</div>
                      <div className="text-sm font-medium">肠梗阻</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🟡</div>
                      <div className="text-sm font-medium">胆道梗阻</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🦠</div>
                      <div className="text-sm font-medium">感染</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">💧</div>
                      <div className="text-sm font-medium">腹水</div>
                    </div>
                    <div className="bg-pink-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🔴</div>
                      <div className="text-sm font-medium">血栓</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">使用统计</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">15,000+</div>
                      <div className="text-gray-600">累计访问</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">11,000+</div>
                      <div className="text-gray-600">服务患者</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 小X宝社区介绍 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">小X宝社区</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                一个病友自助开始的项目，2023年创立，2024年中开源发展，2024年底捐献给天工开物基金会，
                2025年升级为社区化管理。构建纯血版的AI类公益开源项目，目前生态人群180+。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Zap className="w-5 h-5 text-purple-500 mr-2" />
                  社区使命
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    推动AI技术和RAG应用的普及化，集合力量助力25+癌种患者，并延伸至280+罕见病领域。
                    立足患者公益服务，通过技术+任务，有效减少医患信息差，推动患者/家属规范治疗，减低焦虑。
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Code className="w-5 h-5 text-green-500 mr-2" />
                  社区属性
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">💝</div>
                    <div className="text-sm font-medium">公益属性</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🔓</div>
                    <div className="text-sm font-medium">开源属性</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🤖</div>
                    <div className="text-sm font-medium">AI创新</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-2xl mb-1">🏛️</div>
                    <div className="text-sm font-medium">基金会管理</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">经验分享</h3>
                <p className="text-gray-600 text-sm">
                  患者和家属分享治疗经验、护理心得，互相支持鼓励
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">医疗资源</h3>
                <p className="text-gray-600 text-sm">
                  汇集优质医疗资源，推荐专业医生和医院信息
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">互助支持</h3>
                <p className="text-gray-600 text-sm">
                  建立患者互助网络，提供情感支持和实用帮助
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 社区项目展示 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">社区项目</h2>
              <p className="text-lg text-gray-600">
                小X宝社区已推出多个AI助手项目，覆盖不同癌种和罕见病领域
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityProjects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{project.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <div className="space-y-2">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                    {project.links.length === 0 && (
                      <div className="text-center text-sm text-gray-500 py-2">
                        即将推出
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 开源项目 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Github className="w-8 h-8 text-gray-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">开源项目</h2>
              <p className="text-lg text-gray-600">
                社区已开源多个项目，欢迎开发者参与贡献
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {openSourceProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">参与贡献</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <a href="https://wiki.xiao-x-bao.com.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    AI探宝计划 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <p className="text-gray-600">推广患者个人掌握智能体构建</p>
                </div>
                <div>
                  <a href="https://github.com/PancrePal-xiaoyibao/Genie-X-PAL-prompts-center" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    Genie-x-Pal提示词仓库 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <p className="text-gray-600">汇集有效的患者智能体提示词</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 版本更新 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">版本更新</h2>
              <p className="text-lg text-gray-600">
                持续改进，为用户提供更好的体验
              </p>
            </div>

            <div className="space-y-6">
              {versions.map((version, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVersionBadgeColor(version.type)}`}>
                        {version.version}
                      </span>
                      <span className="text-gray-500">{version.date}</span>
                    </div>
                    {index === 0 && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        最新版本
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {version.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-600">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 贡献者感谢 */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">感谢贡献者</h2>
              <p className="text-lg text-gray-600">
                感谢所有为小红卡项目和小X宝社区贡献力量的朋友们
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributors.map((contributor, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{contributor.avatar}</div>
                    <h3 className="text-lg font-semibold text-gray-800">{contributor.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{contributor.role}</p>
                  </div>
                  <p className="text-gray-600 text-sm text-center">
                    {contributor.contribution}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">特别感谢</h3>
              <p className="text-gray-600 mb-4">
                感谢所有使用小红卡的患者和家属，你们的反馈和建议是我们前进的动力。
                感谢医护人员的专业指导，让这个项目更加科学可靠。
                感谢天工开物基金会的支持和社区管理委员会CMC的治理。
              </p>
              <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                <Heart className="w-4 h-4 text-red-500" />
                <span>用爱心连接，用技术服务，用开源共建</span>
                <Heart className="w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
              <p className="text-gray-600">
                如果您有任何建议、问题或想要参与贡献，欢迎联系我们
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <a href="https://hi.xiao-x-bao.com.cn" target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">了解社区</h3>
                <p className="text-sm text-gray-600">社区详细介绍</p>
              </a>
              <a href="https://iamin.xiao-x-bao.com.cn" target="_blank" rel="noopener noreferrer" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">加入我们</h3>
                <p className="text-sm text-gray-600">成为社区志愿者</p>
              </a>
              <a href="https://task.xiaoyibao.com.cn" target="_blank" rel="noopener noreferrer" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">任务中心</h3>
                <p className="text-sm text-gray-600">参与社区任务</p>
              </a>
              <a href="https://bfz.xiao-x-bao.com.cn" target="_blank" rel="noopener noreferrer" className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                <Globe className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">共创宝典</h3>
                <p className="text-sm text-gray-600">并发症病友wiki</p>
              </a>
            </div>

            {/* 直接联系方式 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">直接联系方式</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">微信公众号</h4>
                  <p className="text-sm text-gray-600">小胰宝助手</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">个人微信</h4>
                  <p className="text-sm text-gray-600">Lazio724</p>
                  <p className="text-xs text-gray-500 mt-1">（请说明来意）</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Mail className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">反馈邮箱</h4>
                  <p className="text-sm text-gray-600">service@xiaoyibao.com.cn</p>
                </div>
              </div>
            </div>

            {/* GitHub 项目链接 */}
            <div className="mt-6 text-center">
              <a 
                href="https://github.com/pancrePal-xiaoyibao/pancrePal-xiaoyibao" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>查看项目源码</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              小红卡项目 © 2024-2025 小X宝社区 · 天工开物基金会 | 专业医疗指引，用心服务患者
            </p>
            <p>
              本项目为公益性质，所有功能完全免费使用 | 开源透明，社区共建
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};