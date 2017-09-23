package com.sys.org.service;

import com.sys.org.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
@Transactional
public class CrmService {
    @PersistenceContext
    private EntityManager em;

    public RegistrationInformation createRegInfo(RegistrationInformation information) {
        em.persist(information);
        return information;
    }

    public List<CenterLocation> getAllCenterLocation() {
        TypedQuery<CenterLocation> query = em.createQuery("select c from CenterLocation c", CenterLocation.class);
        return query.getResultList();
    }

    public List<RegistrationType> getAllRegistrationType() {
        TypedQuery<RegistrationType> query = em.createQuery("select c from RegistrationType c", RegistrationType.class);
        return query.getResultList();
    }

    public List<Employers> getEmployersByOccupation(long occupationId) {
        TypedQuery<Employers> query = em.createQuery("select c from Employers c where c.occupation.id=:occupationId", Employers.class);
        query.setParameter("occupationId", occupationId);
        return query.getResultList();
    }

    public List<CityDistrictTown> getDistrictByState(long stateId) {
        TypedQuery<CityDistrictTown> query = em.createQuery("select c from CityDistrictTown c where c.state.id=:stateId", CityDistrictTown.class);
        query.setParameter("stateId", stateId);
        return query.getResultList();
    }

    public List<AreaName> getAreaNameByDistrictAreaType(long districtId, long areaTypeId) {
        TypedQuery<AreaName> query = em.createQuery("select c from AreaName c where c.cityDistrictTown.id=:districtId and c.areaType.id=:areaTypeId", AreaName.class);
        query.setParameter("districtId", districtId);
        query.setParameter("areaTypeId", areaTypeId);
        return query.getResultList();
    }

    public List<PoliceStation> getPoliceStationByAreaName(long areaNameId) {
        TypedQuery<PoliceStation> query = em.createQuery("select c from PoliceStation c where c.areaName.id=:areaNameId", PoliceStation.class);
        query.setParameter("areaNameId", areaNameId);
        return query.getResultList();
    }

    public List<PostOffice> getPostByPoliceStation(long psId) {
        TypedQuery<PostOffice> query = em.createQuery("select c from PostOffice c where c.policeStation.id=:psId", PostOffice.class);
        query.setParameter("psId", psId);
        return query.getResultList();
    }

    public List<PremisesBuildingVillage> getVillagesByPostOffice(long poId) {
        TypedQuery<PremisesBuildingVillage> query = em.createQuery("select c from PremisesBuildingVillage c where c.postOffice.id=:poId", PremisesBuildingVillage.class);
        query.setParameter("poId", poId);
        return query.getResultList();
    }

    public List<Pincode> getPincodeByVillage(long villageId) {
        TypedQuery<Pincode> query = em.createQuery("select c from Pincode c where c.premisesBuildingVillage.id=:villageId", Pincode.class);
        query.setParameter("villageId", villageId);
        return query.getResultList();
    }

    public List<AddressInformation> getAllAddressesByRegInfoId(long regId) {
        TypedQuery<AddressInformation> q = em.createQuery("select c from AddressInformation c where c.registrationInformation.id=:regId", AddressInformation.class);
        q.setParameter("regId", regId);
        return q.getResultList();
    }

    public ConfigParameter getConfigParam(String name) {
        TypedQuery<ConfigParameter> q = em.createQuery("select c from ConfigParameter c where c.name=:name", ConfigParameter.class);
        q.setParameter("name", name);
        return q.getSingleResult();
    }

    public List<BasicInformation> getBasicInformationByRegId(long regId) {
        TypedQuery<BasicInformation> q = em.createQuery("select c from BasicInformation c where c.registrationInformation.id=:regId", BasicInformation.class);
        q.setParameter("regId", regId);
        return q.getResultList();
    }

    public List<ContactPerson> getContactPersonByBasicInformationId(long basicInfoId) {
        TypedQuery<ContactPerson> q = em.createQuery("select c from ContactPerson c where c.basicInformation.id=:basicInfoId", ContactPerson.class);
        q.setParameter("basicInfoId", basicInfoId);
        return q.getResultList();
    }

    public String genarateTicketNumber(){
        TypedQuery<Ticket> q = em.createQuery("select c from Ticket c order by c.id DESC", Ticket.class);
        if (q.getResultList().size()<=0) {
            return "1";
        } else {
            return String.valueOf(Integer.parseInt(q.getResultList().get(0).getTicketNo() == null ? "0" : q.getResultList().get(0).getTicketNo()) + 1);
        }
    }
}
