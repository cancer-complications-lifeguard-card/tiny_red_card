import html2canvas from 'html2canvas';
import { CardConfig } from '../types';

export const downloadAsImage = async (elementId: string, filename: string = 'medical-card.png') => {
  const element = document.querySelector(`[data-card-id="${elementId}"]`) as HTMLElement;
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    alert('生成图片时出现错误，请重试');
  }
};

export const downloadAsJSON = (config: CardConfig, filename: string = 'medical-card-config.json') => {
  const dataStr = JSON.stringify(config, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
};

export const downloadAsMarkdown = (config: CardConfig, filename: string = 'medical-card-config.md') => {
  const selectedComplications = config.complications.filter(c => c.enabled);
  
  let markdown = `# 小红卡 - 并发症管理指引

## 基本信息
- **姓名：** ${config.medicalInfo.name || '___________'}
- **年龄：** ${config.medicalInfo.age || '___________'}
- **血型：** ${config.medicalInfo.bloodType || '___________'}
- **身份证号：** ${config.medicalInfo.idNumber || '___________'}
- **主要诊断：** ${config.medicalInfo.mainDiagnosis || '___________'}
- **手术史：** ${config.medicalInfo.surgeryHistory || '___________'}
- **药物过敏：** ${config.medicalInfo.allergies || '___________'}
- **其他疾病：** ${config.medicalInfo.otherDiseases || '___________'}

## 紧急联系方式
**急救电话：120**

`;

  config.emergencyContacts.forEach((contact, index) => {
    markdown += `**${contact.relationship}：** ${contact.name} ${contact.phone}\n`;
  });

  markdown += `
## 选中的并发症类型
`;

  selectedComplications.forEach(comp => {
    markdown += `- ${comp.name}\n`;
  });

  markdown += `
## 抗凝治疗史
- **正在抗凝治疗：** ${config.anticoagulation.isOnAnticoagulation ? '是' : '否'}
`;

  if (config.anticoagulation.isOnAnticoagulation) {
    markdown += `- **药物种类：** ${config.anticoagulation.medicationType}
- **最后服用时间：** ${config.anticoagulation.lastTaken}
`;
  }

  markdown += `
## 当前用药清单
- **化疗药物：** ${config.currentMedications.chemotherapy || '无'}
- **止痛药物：** ${config.currentMedications.painkillers || '无'}
- **胃肠道药物：** ${config.currentMedications.gastrointestinal || '无'}
- **抗生素：** ${config.currentMedications.antibiotics || '无'}
- **其他药物：** ${config.currentMedications.others || '无'}

## 常用医院
`;

  config.hospitals.forEach((hospital, index) => {
    markdown += `### ${hospital.name}
- **急诊科：** ${hospital.emergency}
- **相关科室：** ${hospital.department}
- **地址：** ${hospital.address}
- **特色：** ${hospital.features}

`;
  });

  markdown += `## 专科医生
`;

  config.doctors.forEach((doctor, index) => {
    markdown += `- **${doctor.name}：** ${doctor.phone} - ${doctor.department} (${doctor.hospital})
`;
  });

  markdown += `
---
*生成时间：${new Date().toLocaleString()}*
*本配置文件可用于重新导入和修改小红卡信息*
`;

  const dataBlob = new Blob([markdown], { type: 'text/markdown' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
};