import React, { useRef } from 'react';
import { Download, Upload, FileText, AlertTriangle, Phone } from 'lucide-react';
import { CardConfig } from '../types';
import { complications } from '../data/complications';

interface CardPreviewProps {
  config: CardConfig;
  onDownloadImage: () => void;
  onDownloadConfig: () => void;
  onUploadConfig: (config: CardConfig) => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  config,
  onDownloadImage,
  onDownloadConfig,
  onUploadConfig
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedComplications = config.complications.filter(c => c.enabled);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedConfig = JSON.parse(e.target?.result as string);
          onUploadConfig(uploadedConfig);
        } catch (error) {
          alert('配置文件格式错误，请检查文件内容');
        }
      };
      reader.readAsText(file);
    }
  };

  const getComplicationData = (id: string) => {
    return complications.find(c => c.id === id);
  };

  const getMedicationsByCategory = (category: string) => {
    return config.currentMedications.medications.filter(med => med.category === category);
  };

  const medicationCategories = [
    '化疗药物',
    '止痛药物',
    '胃肠道药物',
    '抗生素',
    '抗凝药物',
    '激素类药物',
    '免疫抑制剂',
    '心血管药物',
    '其他药物'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">预览和下载小红卡</h2>
        <p className="text-gray-600">请检查信息是否正确，然后下载您的个性化指引卡</p>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={onDownloadImage}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          下载图片
        </button>
        <button
          onClick={onDownloadConfig}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          下载配置
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          上传配置
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* 卡片预览 */}
      <div 
        ref={cardRef}
        className="bg-white border-2 border-red-200 rounded-lg p-6 max-w-4xl mx-auto"
        style={{ minHeight: '800px' }}
      >
        {/* 卡片标题 */}
        <div className="text-center mb-6 border-b-2 border-red-500 pb-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">🚨 小红卡 - 并发症管理指引</h1>
          <p className="text-sm text-gray-600">肿瘤患者紧急情况处理指南</p>
        </div>

        {/* 基本信息 */}
        <div className="mb-6 bg-red-50 rounded-lg p-4">
          <h2 className="text-lg font-bold text-red-700 mb-3">👤 基本信息</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>姓名：</strong>{config.medicalInfo.name || '___________'}</div>
            <div><strong>年龄：</strong>{config.medicalInfo.age || '___________'}</div>
            <div className="flex items-center">
              <strong>血型：</strong>{config.medicalInfo.bloodType || '___________'}
              {config.medicalInfo.bloodType && (
                <div className="ml-2 flex items-center text-red-600">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  <span className="text-xs">急诊前电话告知</span>
                </div>
              )}
            </div>
            <div><strong>主要诊断：</strong>{config.medicalInfo.mainDiagnosis || '___________'}</div>
          </div>
          {config.medicalInfo.bloodType && (
            <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                <strong>血型提醒：</strong>急诊前请第一时间电话告知医院血型为 {config.medicalInfo.bloodType}，便于提前调配血液制品
              </div>
            </div>
          )}
        </div>

        {/* 紧急联系方式 */}
        <div className="mb-6 bg-yellow-50 rounded-lg p-4">
          <h2 className="text-lg font-bold text-yellow-700 mb-3">🆘 紧急联系方式</h2>
          <div className="text-sm space-y-1">
            <div className="font-bold text-red-600">急救电话：120</div>
            {config.emergencyContacts.slice(0, 3).map((contact, index) => (
              <div key={index}>
                <strong>{contact.relationship}：</strong>{contact.name} {contact.phone}
              </div>
            ))}
          </div>
        </div>

        {/* 选中的并发症处理指引 */}
        {selectedComplications.map((complication) => {
          const data = getComplicationData(complication.id);
          if (!data) return null;

          return (
            <div key={complication.id} className="mb-6 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">{data.icon}</span>
                {data.name}急症处理
              </h2>
              
              {/* 紧急情况识别 */}
              <div className="mb-4">
                <h3 className="font-bold text-red-600 mb-2">🚨 立即拨打120的情况：</h3>
                <ul className="text-xs space-y-1">
                  {data.emergencySignals.map((signal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-1">•</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 重要提醒 */}
              <div className="mb-4">
                <h3 className="font-bold text-orange-600 mb-2">⚠️ 重要提醒：</h3>
                <ul className="text-xs space-y-1">
                  {data.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-1">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 禁忌事项 */}
              <div className="mb-4">
                <h3 className="font-bold text-red-600 mb-2">❌ 绝对禁止：</h3>
                <ul className="text-xs space-y-1">
                  {data.prohibitions.map((prohibition, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-1">•</span>
                      {prohibition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* 医院信息 */}
        {config.hospitals.length > 0 && (
          <div className="mb-6 bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-bold text-blue-700 mb-3">🏥 常用医院</h2>
            <div className="space-y-2 text-xs">
              {config.hospitals.slice(0, 3).map((hospital, index) => (
                <div key={index} className="border-l-2 border-blue-300 pl-2">
                  <div className="font-bold">{hospital.name}</div>
                  <div>急诊科：{hospital.emergency}</div>
                  <div>地址：{hospital.address}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 专科医生 */}
        {config.doctors.length > 0 && (
          <div className="mb-6 bg-green-50 rounded-lg p-4">
            <h2 className="text-lg font-bold text-green-700 mb-3">👨‍⚕️ 专科医生</h2>
            <div className="space-y-1 text-xs">
              {config.doctors.slice(0, 3).map((doctor, index) => (
                <div key={index}>
                  <strong>{doctor.name}：</strong>{doctor.phone} - {doctor.department}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 用药信息 */}
        <div className="mb-6 bg-purple-50 rounded-lg p-4">
          <h2 className="text-lg font-bold text-purple-700 mb-3">💊 当前用药</h2>
          
          {/* 按分类显示药物 */}
          {medicationCategories.map(category => {
            const categoryMeds = getMedicationsByCategory(category);
            if (categoryMeds.length === 0) return null;

            return (
              <div key={category} className="mb-3">
                <h3 className="text-sm font-bold text-purple-600 mb-1">{category}：</h3>
                <div className="space-y-1">
                  {categoryMeds.map((med, index) => (
                    <div key={index} className="text-xs pl-2 border-l-2 border-purple-200">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-gray-600">
                        剂量：{med.dosage} | 频率：{med.frequency} | 最后服用：{med.lastTaken}
                        {med.notes && <span> | 备注：{med.notes}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {config.anticoagulation.isOnAnticoagulation && (
            <div className="mt-3 p-2 bg-red-100 rounded text-xs">
              <strong className="text-red-700">抗凝治疗：</strong>
              <span className="text-red-600">
                {config.anticoagulation.medicationType} 
                （最后服用：{config.anticoagulation.lastTaken}）
              </span>
            </div>
          )}

          {config.currentMedications.medications.length === 0 && !config.anticoagulation.isOnAnticoagulation && (
            <div className="text-xs text-gray-500">暂无用药记录</div>
          )}
        </div>

        {/* 底部信息 */}
        <div className="text-center text-xs text-gray-500 border-t pt-4">
          <p>*本指引卡请随身携带，定期更新联系方式*</p>
          <p>*如有疑问请咨询专业医生*</p>
          <p>*紧急情况下，此卡可提供给医护人员参考*</p>
          <p className="mt-2">生成时间：{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};