package com.sys.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A RegistrationInformation.
 */
@Entity
@Table(name = "registration_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RegistrationInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "application_number")
    private String applicationNumber;

    @Column(name = "registration_date")
    private ZonedDateTime registrationDate;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "email_id")
    private String emailId;

    @OneToMany(mappedBy = "registrationInformation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BasicInformation> basicInfos = new HashSet<>();

    @OneToMany(mappedBy = "registrationInformation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactInfo> contactInfos = new HashSet<>();

    @OneToMany(mappedBy = "registrationInformation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AddressInformation> addressInfos = new HashSet<>();

    @OneToMany(mappedBy = "registrationInformation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ticket> tickets = new HashSet<>();

    @ManyToOne
    private CenterLocation centerLocation;

    @ManyToOne
    private RegistrationType registrationType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public RegistrationInformation applicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
        return this;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public ZonedDateTime getRegistrationDate() {
        return registrationDate;
    }

    public RegistrationInformation registrationDate(ZonedDateTime registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(ZonedDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public RegistrationInformation accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public RegistrationInformation mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmailId() {
        return emailId;
    }

    public RegistrationInformation emailId(String emailId) {
        this.emailId = emailId;
        return this;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Set<BasicInformation> getBasicInfos() {
        return basicInfos;
    }

    public RegistrationInformation basicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
        return this;
    }

    public RegistrationInformation addBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.add(basicInformation);
        basicInformation.setRegistrationInformation(this);
        return this;
    }

    public RegistrationInformation removeBasicInfos(BasicInformation basicInformation) {
        this.basicInfos.remove(basicInformation);
        basicInformation.setRegistrationInformation(null);
        return this;
    }

    public void setBasicInfos(Set<BasicInformation> basicInformations) {
        this.basicInfos = basicInformations;
    }

    public Set<ContactInfo> getContactInfos() {
        return contactInfos;
    }

    public RegistrationInformation contactInfos(Set<ContactInfo> contactInfos) {
        this.contactInfos = contactInfos;
        return this;
    }

    public RegistrationInformation addContactInfos(ContactInfo contactInfo) {
        this.contactInfos.add(contactInfo);
        contactInfo.setRegistrationInformation(this);
        return this;
    }

    public RegistrationInformation removeContactInfos(ContactInfo contactInfo) {
        this.contactInfos.remove(contactInfo);
        contactInfo.setRegistrationInformation(null);
        return this;
    }

    public void setContactInfos(Set<ContactInfo> contactInfos) {
        this.contactInfos = contactInfos;
    }

    public Set<AddressInformation> getAddressInfos() {
        return addressInfos;
    }

    public RegistrationInformation addressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
        return this;
    }

    public RegistrationInformation addAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.add(addressInformation);
        addressInformation.setRegistrationInformation(this);
        return this;
    }

    public RegistrationInformation removeAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.remove(addressInformation);
        addressInformation.setRegistrationInformation(null);
        return this;
    }

    public void setAddressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public RegistrationInformation tickets(Set<Ticket> tickets) {
        this.tickets = tickets;
        return this;
    }

    public RegistrationInformation addTickets(Ticket ticket) {
        this.tickets.add(ticket);
        ticket.setRegistrationInformation(this);
        return this;
    }

    public RegistrationInformation removeTickets(Ticket ticket) {
        this.tickets.remove(ticket);
        ticket.setRegistrationInformation(null);
        return this;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    public CenterLocation getCenterLocation() {
        return centerLocation;
    }

    public RegistrationInformation centerLocation(CenterLocation centerLocation) {
        this.centerLocation = centerLocation;
        return this;
    }

    public void setCenterLocation(CenterLocation centerLocation) {
        this.centerLocation = centerLocation;
    }

    public RegistrationType getRegistrationType() {
        return registrationType;
    }

    public RegistrationInformation registrationType(RegistrationType registrationType) {
        this.registrationType = registrationType;
        return this;
    }

    public void setRegistrationType(RegistrationType registrationType) {
        this.registrationType = registrationType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RegistrationInformation registrationInformation = (RegistrationInformation) o;
        if (registrationInformation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registrationInformation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RegistrationInformation{" +
            "id=" + getId() +
            ", applicationNumber='" + getApplicationNumber() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", emailId='" + getEmailId() + "'" +
            "}";
    }
}
